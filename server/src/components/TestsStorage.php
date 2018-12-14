<?php

class TestsStorage
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function list()
  {
    $sql = 'SELECT * FROM ab_tests';
    $sth = $this->db->query($sql);
    return $sth->fetchAll(PDO::FETCH_ASSOC);
  }

  public function listActive()
  {
    $sql = 'SELECT * FROM ab_tests WHERE is_active = 1';
    $sth = $this->db->query($sql);
    return $sth->fetchAll(PDO::FETCH_ASSOC);
  }

  public function add($test)
  {
    $sql = 'INSERT INTO ab_tests VALUE (:name, :is_active, :description)';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    return $sth->execute([
      'name' => $test['name'],
      'is_active' => $test['isActive'],
      'description' => $test['description']
    ]);
  }

  public function update($test)
  {
    $sql = 'UPDATE ab_tests SET is_active = ?, description = ? WHERE name = ?';
    $sth = $this->db->prepare($sql);
    return $sth->execute([
      $test['isActive'],
      $test['description'],
      $test['name']
    ]);
  }

  public function delete($test)
  {
    $sql = 'DELETE FROM ab_tests WHERE name = ?';
    $sth = $this->db->prepare($sql);
    return $sth->execute([$test]);
  }
}
