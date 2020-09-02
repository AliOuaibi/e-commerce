<?php

namespace App\Controller;

use App\Entity\Association;
use App\Repository\AssociationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;

class AssociationController extends AbstractController
{
    /**
     * @Route("api/insert_association", name="association", methods={"POST"})
     */
    public function index(Request $request)
    {
        $association = new Association();
        $content = $request->getContent();
        $json = json_decode($content, true);
        $photo= $json['photo'];
        $name= $json['name'];
        $description= $json['description'];
        $domaine= $json['domaine'];
        $countrie= $json['countrie'];
        $errors = [];
        if(!$errors)
        {
            $association->setPhoto($photo);
            $association->setName($name);
            $association->setDescription($description);
            $association->setDomaine($domaine);
            $association->setCountrie($countrie);
            try
            {
                $om = $this->getDoctrine()->getManager();
                $om->persist($association);
                $om->flush();

                return $this->json([
                    'association' => $association
                ]);
            }
            catch(UniqueConstraintViolationException $e)
            {
                $errors[] = "Association déja crée!";
            }

        }
        return $this->json([
            'errors' => $errors
        ], 400);
    }

    /**
     * @Route("api/fetch_association", name="fetch_association", methods={"GET"})
     */
    public function show(AssociationRepository $repository) {
        $asso = $repository->findAll();
        return $this->json([
            'association' => $asso
        ]);
    }

    /**
     * @Route("api/fetch_association_id/{id}", name="fetch_association_id", methods={"GET"})
     */
    public function show_id(AssociationRepository $repository, $id) {
        $asso = $repository->find($id);
        return $this->json([
            'association' => $asso
        ]);
    }

    /**
     * @Route("/api/association/edit/{id}", name="association_edit", methods={"PATCH"})
     */
    public function edit($id, AssociationRepository $repository)
    {
        $input = file_get_contents("php://input");
        $input = html_entity_decode($input);
        $json = json_decode($input,true);

        $existingassociation = $repository->find($id);

        foreach($json as $key=>$value)
        {
            $setter = "set".ucfirst($key);
            $existingassociation->$setter($value);
        }
        
    
        $om = $this->getDoctrine()->getManager();
        $om->merge($existingassociation);
        $om->flush();

        return $this->json([
            'association' => $existingassociation
        ]); 
    }

    /**
     * @Route("/api/association/delete/{id}", name="association_delete", methods={"DELETE"})
     */
    public function delete(AssociationRepository $repository, $id)
    {
        $deleteasso = $repository->find($id);
        $om = $this->getDoctrine()->getManager();
        $om->remove($deleteasso);
        $om->flush();
        return $this->json([
            'delete' => true
        ]);

    }

    /**
     * @Route("api/count_association", name="count_association", methods={"GET"})
     */
    public function count_association(AssociationRepository $repository) {
        
        $totalAsso = $repository->createQueryBuilder('a')
                    ->select('count(a.id)')
                    ->getQuery()
                    ->getSingleScalarResult();

        return $this->json([
            'association' => $totalAsso
        ]);
    }

    /**
     * @Route("api/count_countrie", name="count_countrie", methods={"GET"})
     */
    public function count_countrie(AssociationRepository $repository) {
        
        $asso = $repository->findAll();
        $tab = [];
        $allCountrie = [];
        
        foreach($asso as $value)
        {
            $countrie = $value->getCountrie();
            array_push($tab,$countrie);
        }
        foreach($tab as $value)
        {
            $countrie = explode("-",$value);
            foreach($countrie as $key)
            {
                array_push($allCountrie,$key);

            }
        }
        
        $allCountrie =  array_unique($allCountrie);
        $count = count($allCountrie);  
        return $this->json([
            'countrie' => $count
        ]);
    }


}
