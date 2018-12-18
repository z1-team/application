<?php

class PartnerController
{
  private $db;

  public function __construct($config)
  {
    try {
      $this->db = new PDO($config['dsn'], $config['user'], $config['password']);
    } catch (PDOException $e) {
      echo 'Подключение не удалось: ' . $e->getMessage();
    }
  }

  public function fetchAll()
  {
    $rating = "(
      SELECT AVG(rating) FROM testimonials
      WHERE partner = partners.id AND status = 'published') as rating";
    $count = "(
      SELECT COUNT(*) FROM testimonials
      WHERE partner = partners.id AND status = 'published') as t_count";
    $sql = "SELECT id, type, title, data, $rating, $count FROM partners LIMIT 1000";
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute();
    $result = [];
    while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
      $partner  = new Partner(
        $row['id'],
        $row['type'],
        $row['title'],
        json_decode($row['data'], true),
        $row['rating'],
        $row['t_count']
      );
      $result[] = $partner->toArray();
    }
    return $result;
  }

  public function update($jsonPartner)
  {
    $partner = Partner::makeFromJSON($jsonPartner)->prepare();
    if ($partner) {
      $sql = 'UPDATE partners SET title = :title, data = :data WHERE id = :id';
      $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
      return $sth->execute([
        'title' => $partner->getTitle(),
        'data' => $partner->getData(),
        'id' => $partner->getId()
      ]) ? ['success' => 'ok']
         : ['error' => 'Update failed!'];
    } else {
      return ['error' => 'Bad request!'];
    }
  }

  public function create($jsonPartner)
  {
    $partner = Partner::makeFromJSON($jsonPartner)->prepare();
    if ($partner) {
      $sql = 'INSERT INTO partners (type, title, data) VALUE (:type, :title, :data)';
      $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
      return $sth->execute([
        'type' => $partner->getType(),
        'title' => $partner->getTitle(),
        'data' => $partner->getData()
      ]) ? ['id' => $this->db->lastInsertId('id')]
         : ['error' => 'Creating failed!'];
    } else {
      return ['error' => 'Bad request!'];
    }
  }

  public function delete($id)
  {
    $sql = 'DELETE FROM partners WHERE id = :id';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    return $sth->execute([
      'id' => $id
      ]) ? ['id' => $id]
      : ['error' => 'Deleting failed!'];
  }

  public function isAuthAction($action)
  {
    switch ($action) {
      case 'update':
      case 'create':
      case 'delete':
        return true;
      default:
        return false;
    }
  }

  public function processRequest($action)
  {
    switch ($action) {
      case 'fetch':
        return $this->fetchAll();
      case 'update':
        return $this->update($request);
      case 'create':
        return $this->create($request);
      case 'delete':
        return $this->delete($request);
      default:
        return ['error' => 'Bad request!'];
    }
  }
}
