<?php

namespace App\Repository;

use App\Entity\Countrie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Countrie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Countrie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Countrie[]    findAll()
 * @method Countrie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CountrieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Countrie::class);
    }

    // /**
    //  * @return Countrie[] Returns an array of Countrie objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Countrie
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
