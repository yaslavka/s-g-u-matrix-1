<?php

namespace App\Controller;

use App\Entity\UserProfile;
use App\Repository\UserProfileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    private UserProfileRepository $userProfileRepository;

    public function __construct(UserProfileRepository $userProfileRepository)
    {
        $this->userProfileRepository = $userProfileRepository;
    }

    #[Route('/registration', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface): Response
    {
        $data = json_decode($request->getContent(), true);

        $user = new UserProfile();

        $user->setPassword(
            $userPasswordHasherInterface->hashPassword(
                $user,
                $data['password']
            )
        );

        $user->setEmail($data['email']);
        $user->setFirstName($data['first_name']);
        $user->setLastName($data['last_name']);
        $user->setUsername($data['username']);

        if ($data['phone']) {
            $user->setPhone($data['phone']);
        }
        if ($data['referral']) {
            $referral = $this->userProfileRepository->findOneBy(['username' => $data['referral']]);
            if ($referral) {
                $user->setReferral($referral);
            }
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->redirectToRoute('app_question_root');
    }
}
