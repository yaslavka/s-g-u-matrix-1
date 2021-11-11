<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QuestionController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function root(): Response
    {

        return $this->render('base.html.twig');

    }
    /**
     * @Route("/Sign_up")
     */
    public function signUp(): Response
    {

        return $this->render('base.html.twig');

    }
    /**
     * @Route("/Sign_in")
     */
    public function signIn(): Response
    {

        return $this->render('base.html.twig');
    }
    /**
     * @Route("/reset-password")
     */
    public function resetPassword(): Response
    {
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/leader")
     */
    public function leader(): Response
    {
        return $this->render('leader/leader.html.twig');
    }
    /**
     * @Route("/dashboard")
     */
    public function dashboard(): Response
    {
        dump($this);
        return $this->render('dashboard/dashboard.html.twig');
    }

    /**
     * @Route("/news")
     */
    public function news(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/about-us")
     */
    public function aboutUs(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/tables")
     */
    public function tables(): Response
    {
        dump($this);
        return $this->render('tables/tables.html.twig');
    }
    /**
     * @Route("/personal-table/1")
     */
    public function personalTable(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-table/2")
     */
    public function personalTable2(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-table/3")
     */
    public function personalTable3(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-table/4")
     */
    public function personalTable4(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-table/5")
     */
    public function personalTable5(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-table/6")
     */
    public function personalTable6(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-table/7")
     */
    public function personalTable7(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-table/8")
     */
    public function personalTable8(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/premium-stars")
     */
    public function premiumStars(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-premium-table/1")
     */
    public function personalPremiumTable(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-premium-table/2")
     */
    public function personalPremiumTable2(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-premium-table/3")
     */
    public function personalPremiumTable3(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-premium-table/4")
     */
    public function personalPremiumTable4(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-premium-table/5")
     */
    public function personalPremiumTable5(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/super-stars")
     */
    public function superStars(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/1")
     */
    public function personalSSTable(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/2")
     */
    public function personalSSTable2(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/3")
     */
    public function personalSSTable3(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/4")
     */
    public function personalSSTable4(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/5")
     */
    public function personalSSTable5(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/6")
     */
    public function personalSSTable6(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/7")
     */
    public function personalSSTable7(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/8")
     */
    public function personalSSTable8(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/9")
     */
    public function personalSSTable9(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/personal-super-star-table/10")
     */
    public function personalSSTable10(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/exchange")
     */
    public function exchange(): Response
    {
        dump($this);
        return $this->render('exchange/exchange/active.html.twig');
    }
    /**
     * @Route("/casino/ended")
     */
    public function casinoEnded(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/startrek")
     */
    public function starTrek(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/startrec/planets")
     */
    public function starTrekPlanets(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/startrec/statistic")
     */
    public function starTrekStatistic(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/startrec/first-line-planets")
     */
    public function starTrekFirstLinePlanets(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/starsup")
     */
    public function starsUp(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/starsup/person/1")
     */
    public function starsUpPersonTable(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/finances")
     */
    public function finances(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/team")
     */
    public function team(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/education")
     */
    public function education(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/educations/send-request")
     */
    public function educationForm(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
    /**
     * @Route("/settings")
     */
    public function settings(): Response
    {
        dump($this);
        return $this->render('base.html.twig');
    }
}
