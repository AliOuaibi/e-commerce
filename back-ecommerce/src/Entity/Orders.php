<?php

namespace App\Entity;

use App\Repository\OrdersRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=OrdersRepository::class)
 */
class Orders
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
    private $status;

    /**
     * @ORM\Column(type="date")
     */
    private $date_order;

    /**
     * @ORM\Column(type="integer")
     */
    private $id_user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $articles;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $total;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $carrier;

    

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDateOrder(): ?\DateTimeInterface
    {
        return $this->date_order;
    }

    public function setDateOrder(\DateTimeInterface $date_order): self
    {
        $this->date_order = $date_order;

        return $this;
    }

    public function getArticles(): ?string
    {
        return $this->articles;
    }

    public function setArticles(string $articles): self
    {
        $this->articles = $articles;

        return $this;
    }

    public function getTotal(): ?string
    {
        return $this->total;
    }

    public function setTotal(string $total): self
    {
        $this->total = $total;

        return $this;
    }

    public function getCarrier(): ?string
    {
        return $this->carrier;
    }

    public function setCarrier(string $carrier): self
    {
        $this->carrier = $carrier;
        return $this;
    }

    public function getIdUser(): ?int
    {
        return $this->id_user;
    }

    public function setIdUser(int $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }
}
