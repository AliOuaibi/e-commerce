<?php

namespace App\Entity;

use App\Repository\CarriersRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CarriersRepository::class)
 */
class Carriers
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prix;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $delais_livraison;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDelaisLivraison(): ?string
    {
        return $this->delais_livraison;
    }

    public function setDelaisLivraison(string $delais_livraison): self
    {
        $this->delais_livraison = $delais_livraison;

        return $this;
    }
}
