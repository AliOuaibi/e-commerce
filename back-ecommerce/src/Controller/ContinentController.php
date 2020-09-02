<?php

namespace App\Controller;

use App\Entity\Continent;
use App\Repository\ContinentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;

class ContinentController extends AbstractController
{
    /**
     * @Route("api/fetch_continent", name="fetch_continent", methods={"GET"})
     */
    public function show(ContinentRepository $repository) {
        $continent = $repository->findAll();
        return $this->json([
            'continent' => $continent
        ]);
    }
}
