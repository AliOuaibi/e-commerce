<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Association;
use App\Entity\Orders;

use App\Repository\OrdersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\Date;

use DateTimeInterface;



class OrdersController extends AbstractController
{
    /**
     * @Route("/api/payment", name="api_payment", methods={"POST"})
     */
    public function payment(Request $request)
    {
        $order = new Orders();
        $content = $request->getContent();
        $json = json_decode($content, true);
        $id_user= $json['id_user'];
        $articles= $json['articles'];
        $status= $json['status'];
        $total= $json['total'];
        $carrier= $json['carrier'];

        $order->setStatus($status);
        $order->setIdUser($id_user);
        $order->setDateOrder(new \DateTime('now'));
        $order->setArticles($articles);
        $order->setTotal($total);
        $order->setCarrier($carrier);
        $om = $this->getDoctrine()->getManager();
        $om->persist($order);
        $om->flush();

        return $this->json([
            'order' => $order
        ]);
        
    }

    /**
     * @Route("api/fetch_orders", name="fetch_orders", methods={"GET"})
     */
    public function fetch_orders(OrdersRepository $repository) {
        $orders = $repository->findAll();
        return $this->json([
            'orders' => $orders
        ]);
    }

    /**
     * @Route("api/fetch_orders/{id}", name="fetch_orders_id", methods={"GET"})
     */
    public function fetch_orders_id(OrdersRepository $repository, $id) {
        $orders = $repository->findBy(['id_user'=>$id],
        array('id' => 'DESC'));
        return $this->json([
            'orders' => $orders
        ]);
    }

    /**
     * @Route("/api/annul_orders/{id}", name="orders_anul", methods={"PATCH"})
     */
    public function annul_orders($id, OrdersRepository $repository)
    {
        $input = file_get_contents("php://input");
        $input = html_entity_decode($input);
        $json = json_decode($input,true);
        $status = $json['status'];
        $existingOrders = $repository->find($id);

        $existingStatus= $existingOrders->getStatus();
        if($existingStatus == "WAITING" && $status =="CANCEL")
        {
            $existingOrders->setStatus($status);
            $om = $this->getDoctrine()->getManager();
            $om->merge($existingOrders);
            $om->flush();
    
            return $this->json([
                'status' => true
            ]); 
        }
        else{
            return $this->json([
                'status' => false
            ]); 
        }

         
    }

    /**
     * @Route("/api/gestion_orders/{id}", name="orders_gestion", methods={"PATCH"})
     */
    public function gestion_orders($id, OrdersRepository $repository)
    {
        $input = file_get_contents("php://input");
        $input = html_entity_decode($input);
        $json = json_decode($input,true);
        $status = $json['status'];

        $existingOrders = $repository->find($id);
        $existingOrders->setStatus($status);
        
        $om = $this->getDoctrine()->getManager();
        $om->merge($existingOrders);
        $om->flush();

        return $this->json([
            'status' => true
        ]); 
    }

    /**
     * @Route("api/count_orders", name="count_orders", methods={"GET"})
     */
    public function count_orders(OrdersRepository $repository) {

        $totalOrders = $repository->createQueryBuilder('a')
                    ->select('count(a.id)')
                    ->getQuery()
                    ->getSingleScalarResult();

        return $this->json([
            'Orders' => $totalOrders
        ]);
    }

    /**
     * @Route("api/count_money", name="count_money", methods={"GET"})
     */
    public function count_money(OrdersRepository $repository) {
        
        $orders = $repository->findAll();
        $tab = [];
        $somme = 0;
        
        foreach($orders as $value)
        {
            $frais = ($value->getTotal() * 5)/100;
            $total = $value->getTotal() - $frais;
            array_push($tab,$total);
        }
        foreach($tab as $value)
        {
            $somme+=$value;
        }

        return $this->json([
            'somme' => $somme
        ]);
    }
}
