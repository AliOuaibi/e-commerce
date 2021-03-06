<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Firebase\JWT\JWT;

class UserAuthenticator extends AbstractGuardAuthenticator
{
    private $passwordEncoder;
   public function __construct(UserPasswordEncoderInterface $passwordEncoder)
   {
       $this->passwordEncoder = $passwordEncoder;
   }
   public function supports(Request $request)
   {
       return $request->get("_route") === "api_login" && $request->isMethod("POST");
   }
   public function getCredentials(Request $request)
   {
        $content = $request->getContent();
        $json = json_decode($content, true);
        return [
            'email' => $json["email"],
            'password' => $json["password"]
        ];
   }
   public function getUser($credentials, UserProviderInterface $userProvider)
   {
       return $userProvider->loadUserByUsername($credentials['email']);
   }
   public function checkCredentials($credentials, UserInterface $user)
   {
       return $this->passwordEncoder->isPasswordValid($user, $credentials['password']);
   }
   public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
   {
       return new JsonResponse([
           'error' => $exception->getMessageKey()
       ], 400);
   }
   public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
   {
        $expireTime = time() + 3600;
        $tokenPayload = [
            'user_id' => $token->getUser()->getId(),
            'email'   => $token->getUser()->getEmail(),
            'exp'     => $expireTime
        ];
        $jwt = JWT::encode($tokenPayload, getenv("JWT_SECRET"));
        // If you are developing on a non-https server, you will need to set 
        // the $useHttps variable to false
        $useHttps = false;
        setcookie("jwt", $jwt, $expireTime, "/", "", $useHttps, true);
        return new JsonResponse([
            
            'id' => $token->getUser()->getId(),
            'email'   => $token->getUser()->getEmail(),
            'name' => $token->getUser()->getName(),
            'surname' => $token->getUser()->getSurname(),
            'adress' => $token->getUser()->getAdress(),
            'role' => $token->getUser()->getRoles()
        ]);
        

    
   }
   public function start(Request $request, AuthenticationException $authException = null)
   {
       return new JsonResponse([
           'error' => 'Access Denied'
       ]);
   }
   public function supportsRememberMe()
   {
       return false;
   }

}
