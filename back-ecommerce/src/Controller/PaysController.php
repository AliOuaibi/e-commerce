<?php

namespace App\Controller;

use App\Entity\Countrie;
use App\Repository\CountrieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;

class PaysController extends AbstractController
{
    /**
     * @Route("api/fetch_countrie", name="fetch_countrie", methods={"GET"})
     */
    public function show(CountrieRepository $repository) {
        $pays = $repository->findAll();
        return $this->json([
            'countrie' => $pays
        ]);
    }
}