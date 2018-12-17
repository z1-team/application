<?php

class GroupsStorage
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function listByTest($test)
  {
    $sql = 'SELECT * FROM ab_groups WHERE test = ?';
    $sth = $this->db->prepare($sql);
    $sth->execute($test);
    return $sth->fetchAll(PDO::FETCH_ASSOC);
  }

  public function add($test, $group)
  {
    $sql = 'INSERT INTO ab_groups VALUE (:name, :test, :description)';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    return $sth->execute([
      'name' => $group['name'],
      'test' => $test,
      'description' => $group['description']
    ]);
  }

  public function delete($group)
  {
    $sql = 'DELETE FROM ab_groups WHERE name = ? AND test = ?';
    $sth = $this->db->prepare($sql);
    return $sth->execute([
      $group['name'],
      $group['test']
    ]);
  }
}
