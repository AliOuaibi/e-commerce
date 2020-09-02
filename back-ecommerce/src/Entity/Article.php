<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 */
class Article
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
    private $price;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $photo_1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $photo_2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $photo_3;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $continent;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $countrie;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $association;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $categorie;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $photo_4;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $genre;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stock_XS;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stock_S;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stock_M;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stock_L;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stock_XL;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $color;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
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

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPhoto1(): ?string
    {
        return $this->photo_1;
    }

    public function setPhoto1(?string $photo_1): self
    {
        $this->photo_1 = $photo_1;

        return $this;
    }

    public function getPhoto2(): ?string
    {
        return $this->photo_2;
    }

    public function setPhoto2(?string $photo_2): self
    {
        $this->photo_2 = $photo_2;

        return $this;
    }

    public function getPhoto3(): ?string
    {
        return $this->photo_3;
    }

    public function setPhoto3(?string $photo_3): self
    {
        $this->photo_3 = $photo_3;

        return $this;
    }

    public function getContinent(): ?string
    {
        return $this->continent;
    }

    public function setContinent(?string $continent): self
    {
        $this->continent = $continent;

        return $this;
    }

    public function getCountrie(): ?string
    {
        return $this->countrie;
    }

    public function setCountrie(?string $countrie): self
    {
        $this->countrie = $countrie;

        return $this;
    }

    public function getAssociation(): ?string
    {
        return $this->association;
    }

    public function setAssociation(?string $association): self
    {
        $this->association = $association;

        return $this;
    }

    public function getCategorie(): ?string
    {
        return $this->categorie;
    }

    public function setCategorie(?string $categorie): self
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getPhoto4(): ?string
    {
        return $this->photo_4;
    }

    public function setPhoto4(string $photo_4): self
    {
        $this->photo_4 = $photo_4;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(string $genre): self
    {
        $this->genre = $genre;

        return $this;
    }

    public function getStockXS(): ?string
    {
        return $this->stock_XS;
    }

    public function setStockXS(?string $stock_XS): self
    {
        $this->stock_XS = $stock_XS;

        return $this;
    }

    public function getStockS(): ?string
    {
        return $this->stock_S;
    }

    public function setStockS(?string $stock_S): self
    {
        $this->stock_S = $stock_S;

        return $this;
    }

    public function getStockM(): ?string
    {
        return $this->stock_M;
    }

    public function setStockM(?string $stock_M): self
    {
        $this->stock_M = $stock_M;

        return $this;
    }

    public function getStockL(): ?string
    {
        return $this->stock_L;
    }

    public function setStockL(?string $stock_L): self
    {
        $this->stock_L = $stock_L;

        return $this;
    }

    public function getStockXL(): ?string
    {
        return $this->stock_XL;
    }

    public function setStockXL(?string $stock_XL): self
    {
        $this->stock_XL = $stock_XL;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }

}
