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
    $sql = 'INSERT INTO ab_groups VALUE (:name, :test, :value)';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    return $sth->execute([
      'name' => $group['name'],
      'test' => $test,
      'value' => $group['value']
    ]);
  }

  public function update($group)
  {
    $sql = 'UPDATE ab_groups SET value = ? WHERE name = ? AND test = ?';
    $sth = $this->db->prepare($sql);
    return $sth->execute([
      $group['value'],
      $group['name'],
      $group['test']
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
