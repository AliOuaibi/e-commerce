<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Repository\UserRepository;





class ApiController extends AbstractController 
{
    /**
     * @Route("/api/register", name="api_register", methods={"POST"})
     */
    public function register(UserPasswordEncoderInterface $passwordEncoder,Request $request)
    {
        $user = new User();
        
        $content = $request->getContent();
        $json = json_decode($content, true);
        $email= $json['email'];
        $name= $json['name'];
        $surname= $json['surname'];
        $adresse = $json['adress'];
        $password  = $json['password'];
        $passwordConfirmation= $json['password_confirmation'];
        $errors = [];
        if($password != $passwordConfirmation)
        {
            $errors[] = "La confirmation est incorrecte.";
        }
        if(!$errors)
        {
            $encodedPassword = $passwordEncoder->encodePassword($user, $password);
            $user->setEmail($email);
            $user->setAdress($adresse);
            $user->setName($name);
            $user->setSurname($surname);
            $user->setPassword($encodedPassword);

            try
            {
                $om = $this->getDoctrine()->getManager();
                $om->persist($user);
                $om->flush();

                return $this->json([
                    'user' => $user
                ]);
            }
            catch(UniqueConstraintViolationException $e)
            {
                $errors[] = "L’e-mail fourni a déjà un compte!";
            }

        }
        return $this->json([
            'errors' => $errors
        ], 400);

    }
    
    /**
     * @Route("/api/login", name="api_login", methods={"POST"})
     */
    public function login()
    {
        return $this->json(['result' => true]);
    }
    /**
     * @Route("/api/user/edit/{id}", name="user_update",methods={"PATCH"})
     */
    public function update_user($id, UserRepository $userRepository)
    {
        $input = file_get_contents("php://input");
        $input = html_entity_decode($input);
        $json = json_decode($input,true);
        $existingUser = $userRepository->find($id);

        foreach($json as $key=>$value)
        {
            $setter = "set".ucfirst($key);
            $existingUser->$setter($value);
        }

        $om = $this->getDoctrine()->getManager();
        $om->merge($existingUser);
        $om->flush();

        return $this->json([
            'user' => $existingUser
        ]); 
    }
    /**
     * @Route("/api/user/editPass/{id}", name="user_updatePass",methods={"PATCH"})
     */
    public function update_userPass(UserPasswordEncoderInterface $passwordEncoder,$id, UserRepository $userRepository)
    {
        $input = file_get_contents("php://input");
        $input = html_entity_decode($input);
        $json = json_decode($input,true);
        $existingUser = $userRepository->find($id);

        $password= $json['password'];
        $encodedPassword = $passwordEncoder->encodePassword($existingUser, $password);
        $existingUser->setPassword($encodedPassword);
        $om = $this->getDoctrine()->getManager();
        $om->merge($existingUser);
        $om->flush();

        return $this->json([
            'user' => $existingUser
        ]); 
    }

    /**
     * @Route("api/fetch_users", name="fetch_users", methods={"GET"})
     */
    public function fetch_users(UserRepository $userRepository) {
        $users = $userRepository->findAll();
        return $this->json([
            'users' => $users
        ]);
    }

    /**
     * @Route("api/delete_user/{id}", name="delete_user", methods={"DELETE"})
     */
    public function delete_user(UserRepository $userRepository,$id) {
        $deleteUser = $userRepository->find($id);
        $om = $this->getDoctrine()->getManager();
        $om->remove($deleteUser);
        $om->flush();
        return $this->json([
            'delete' => true
        ]);
    }

    /**
     * @Route("/api/user/putAdmin/{id}", name="user_putAdmin",methods={"PATCH"})
     */
    public function putAdmin($id, UserRepository $userRepository)
    {
        $existingUser = $userRepository->find($id);
        $role = array('ROLE_ADMIN');
        $existingUser->setRoles($role);
        $om = $this->getDoctrine()->getManager();
        $om->merge($existingUser);
        $om->flush();

        return $this->json([
            'user' => $existingUser
        ]); 
    }

    
}
