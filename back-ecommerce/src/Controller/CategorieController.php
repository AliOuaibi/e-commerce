<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;

class CategorieController extends AbstractController
{
    /**
     * @Route("api/insert_categorie", name="categorie", methods={"POST"})
     */
    public function index(Request $request)
    {
        $categorie = new Categorie();
        $content = $request->getContent();
        $json = json_decode($content, true);
        $photo= $json['photo'];
        $name= $json['name'];
        $errors = [];
        if(!$errors)
        {
            $categorie->setPhoto($photo);
            $categorie->setName($name);
            try
            {
                $om = $this->getDoctrine()->getManager();
                $om->persist($categorie);
                $om->flush();

                return $this->json([
                    'categorie' => $categorie
                ]);
            }
            catch(UniqueConstraintViolationException $e)
            {
                $errors[] = "Categorie déja crée!";
            }

        }
        return $this->json([
            'errors' => $errors
        ], 400);
    }

    /**
     * @Route("api/fetch_categorie", name="fetch_categorie", methods={"GET"})
     */
    public function show(CategorieRepository $repository) {
        $categories = $repository->findAll();
        return $this->json([
            'categories' => $categories
        ]);
    }
    /**
     * @Route("api/fetch_categorie/{id}", name="fetch_categorie_id", methods={"GET"})
     */
    public function fetch_categorie_id(CategorieRepository $repository, $id) {
        $categorie = $repository->find($id);
        return $this->json([
            'categorie' => $categorie
        ]);
    }

    /**
     * @Route("/api/categorie/edit/{id}", name="categorie_edit", methods={"PATCH"})
     */
    public function edit($id, CategorieRepository $categorieRepository)
    {
        $input = file_get_contents("php://input");
        $input = html_entity_decode($input);
        $json = json_decode($input,true);

        $existingCategorie = $categorieRepository->find($id);

        foreach($json as $key=>$value)
        {
            $setter = "set".ucfirst($key);
            $existingCategorie->$setter($value);
        }
        
    
        $om = $this->getDoctrine()->getManager();
        $om->merge($existingCategorie);
        $om->flush();

        return $this->json([
            'categorie' => $existingCategorie
        ]); 
    }

    /**
     * @Route("/api/categorie/delete/{id}", name="categorie_delete", methods={"DELETE"})
     */
    public function delete(CategorieRepository $categorieRepository, $id)
    {
        $deleteCategorie = $categorieRepository->find($id);
        $om = $this->getDoctrine()->getManager();
        $om->remove($deleteCategorie);
        $om->flush();
        return $this->json([
            'delete' => true
        ]);

    }
}
