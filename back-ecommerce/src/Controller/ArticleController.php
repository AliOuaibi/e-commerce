<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Association;
use App\Entity\Orders;
use App\Entity\Comment;

use App\Repository\ArticleRepository;
use App\Repository\CommentRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\Date;

use DateTimeInterface;




class ArticleController extends AbstractController
{
    /**
     * @Route("/api/articles", name="fetch_articles", methods={"GET"})
     */
    public function fetch_articles(ArticleRepository $articleRepository)
    {
        $articles = $articleRepository->findAll();
        return $this->json([
            'articles' => $articles
        ]);
    }

    /**
     * @Route("/api/article_categorie/{categorie}", name="fetch_articleCate", methods={"GET"})
     */
    public function article_categorie(ArticleRepository $articleRepository, $categorie)
    {
        $articles = $articleRepository->findBy(['categorie'=>$categorie]);
            return $this->json([
                'article' => $articles
            ]);
    }
    /**
     * @Route("/api/article/{id}", name="fetch_article", methods={"GET"})
     */
    public function fetch_article(ArticleRepository $articleRepository,$id)
    {
        $article = $articleRepository->find($id);
        return $this->json([
            'article' => $article
        ]);
    }

    
     /**
     * @Route("/api/articles/last", name="last_article", methods={"GET"})
     */
    public function last_articles(ArticleRepository $articleRepository)
    {
       
        $article = $articleRepository->findBy(
            array(),
            array('id' => 'DESC'), 
            3);
        return $this->json([
            'last_articles' => $article
        ]);
    }

    /**
     * @Route("/api/article/new", name="article_new", methods={"POST"})
     */
    public function new(Request $request)
    {
        $article = new Article();
        
        $content = $request->getContent();
        $json = json_decode($content, true);
        $name= $json['name'];
        $description= $json['description'];
        $association= $json['association'];
        $continent = $json['continent'];
        $countrie = $json['countrie'];
        $categorie = $json['categorie'];
        $price  = $json['price'];
        $photo  = $json['photo_1'];
        $photo1  = $json['photo_2'];
        $photo2  = $json['photo_3'];
        $photo3  = $json['photo_4'];
        $genre =$json['genre'];
        $color = $json['color'];

        // condition if accessoire ou vêtement
        // vêtement -> xs=10, s=10, m=10, l=10, xl=10
        // accesoire -> xs=10, s=null, m=null, l=null, xl=null
        
        // t-shirt          sweatshirt      chaussettes     
        if($categorie==1 || $categorie==2 || $categorie==3 ){

            $xs = 10;
            $s = 10;
            $m = 10;
            $l = 10;
            $xl = 10;
        }
        else{
            $xs = 10;
            $s = null;
            $m = null;
            $l = null;
            $xl = null;
        }

        $errors = [];
        
        if(!$errors)
        {
            $article->setName($name);
            $article->setPhoto1($photo);
            $article->setPrice($price);
            $article->setDescription($description);
            $article->setPhoto2($photo1);
            $article->setPhoto3($photo2);
            $article->setPhoto4($photo3);
            $article->setContinent($continent);
            $article->setCountrie($countrie);
            $article->setCategorie($categorie);
            $article->setAssociation($association);
            $article->setGenre($genre);
            $article->setStockXS($xs);
            $article->setStockS($s);
            $article->setStockM($m);
            $article->setStockL($l);
            $article->setStockXL($xl);
            $article->setColor($color);

            try
            {
                $om = $this->getDoctrine()->getManager();
                $om->persist($article);
                $om->flush();

                return $this->json([
                    'article' => $article
                ]);
            }
            catch(UniqueConstraintViolationException $e) 
            {
                $errors[] = "Erreur d'insertion";
            }

        }
        return $this->json([
            'errors' => $errors
        ], 400);
    }

   

    /**
     * @Route("/api/article/edit/{id}", name="article_edit", methods={"PATCH"})
     */
    public function edit(Request $request, $id, ArticleRepository $articleRepository)
    {
        $input = file_get_contents("php://input");
        $input = html_entity_decode($input);
        $json = json_decode($input,true);
        $existingArticle = $articleRepository->find($id);
        foreach($json as $key=>$value)
        {
            $setter = "set".ucfirst($key);
            $existingArticle->$setter($value);
        }
        $om = $this->getDoctrine()->getManager();
        $om->merge($existingArticle);
        $om->flush();

        return $this->json([
            'article' => $existingArticle
        ]); 
    }

    /**
     * @Route("/api/article/delete/{id}", name="article_delete", methods={"DELETE"})
     */
    public function delete(Request $request, ArticleRepository $articleRepository, $id)
    {
        $existingArticle = $articleRepository->find($id);
        $om = $this->getDoctrine()->getManager();
        $om->remove($existingArticle);
        $om->flush();
        return $this->json([
            'delete' => true
        ]);

    }

    /**
     * @Route("/api/payment", name="api_payment", methods={"POST"})
     */
    public function payment(Request $request)
    {
        $order = new Orders();
        $content = $request->getContent();
        $json = json_decode($content, true);
        $id_user= $json['id_user'];
        $status= 0;
        $articles= $json['articles'];
        $order->setStatus($status);
        $order->setIdUser($id_user);
        $order->setDateOrder(new \DateTime('now'));
        $order->setArticles($articles);
        $om = $this->getDoctrine()->getManager();
        $om->persist($order);
        $om->flush();

        return $this->json([
            'order' => $order
        ]);
        
    }

    /**
     * @Route("/api/article/comment", name="article_comment", methods={"POST"})
     */
    public function comment(Request $request)
    {
        $comment = new Comment();
        
        $content = $request->getContent();
        $json = json_decode($content, true);
        $article= $json['article'];
        $commentaire= $json['commentaire'];
        $id_user= $json['id_user'];
       

        $errors = [];
        
        if(!$errors)
        {
            $comment->setArticle($article);
            $comment->setIdUser($id_user);
            $comment->setCommentaire($commentaire);
           
            try
            {
                $om = $this->getDoctrine()->getManager();
                $om->persist($comment);
                $om->flush();

                return $this->json([
                    'comment' => $comment
                ]);
            }
            catch(UniqueConstraintViolationException $e) 
            {
                $errors[] = "Erreur d'insertion";
            }

        }
        return $this->json([
            'errors' => $errors
        ], 400);
    }

    /**
     * @Route("/api/comments/{id}", name="fetch_comments", methods={"GET"})
     */
    public function fetch_comments(CommentRepository $repository, $id)
    {
        $comments = $repository->findBy(['article'=>$id]);
        return $this->json([
            'comments' => $comments
        ]);
    }


}
