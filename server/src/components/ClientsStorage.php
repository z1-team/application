<?php

class ClientsStorage
{
  private $client;
  private $db;

  public function __construct($db, $client)
  {
    $this->client = $client;
    $this->db = $db;
  }

  public function testParams($client)
  {
    $sql = 'SELECT * FROM ab_tests WHERE is_active = 1';
    $sth = $this->db->query($sql);
    return $sth->fetchAll(PDO::FETCH_ASSOC);
  }
}
