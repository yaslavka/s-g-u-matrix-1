<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211110033754 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_profile ADD first_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user_profile ADD last_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user_profile ADD email VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user_profile ADD phone VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user_profile ADD is_verified BOOLEAN NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE user_profile DROP first_name');
        $this->addSql('ALTER TABLE user_profile DROP last_name');
        $this->addSql('ALTER TABLE user_profile DROP email');
        $this->addSql('ALTER TABLE user_profile DROP phone');
        $this->addSql('ALTER TABLE user_profile DROP is_verified');
    }
}
