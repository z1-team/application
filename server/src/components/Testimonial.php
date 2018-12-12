<?php

class Testimonial
{
  private static $db;

  public static function init($config)
  {
    try {
      self::$db = new PDO($config['dsn'], $config['user'], $config['password']);
    } catch (PDOException $e) {
      echo 'Подключение не удалось: ' . $e->getMessage();
    }
  }

  public static function findUnpublished()
  {
    $sql = 'SELECT * FROM testimonials WHERE status = "created"';
    $sth = self::$db->query($sql);
    return $sth->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function findByPartner($id)
  {
    $sql = 'SELECT * FROM testimonials WHERE status = "published" AND partner = :id';
    $sth = self::$db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute(['id' => $id]);
    return $sth->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function postNew($testimonial)
  {
    $sql = 'INSERT INTO testimonials (partner, name, email, text, rating, status) VALUE (:partner, :name, :email, :text, :rating, :status)';
    $sth = self::$db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    return ['success' => $sth->execute([
      'partner' => $testimonial['partner'],
      'name' => $testimonial['name'],
      'email' => $testimonial['email'],
      'text' => $testimonial['text'],
      'rating' => $testimonial['rating'],
      'status' => 'created'
    ])];
  }

  public static function update($testimonial)
  {
    $sql = 'UPDATE testimonials SET text = :text, status = :status WHERE id = :id';
    $sth = self::$db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    return ['success' => $sth->execute([
      'text' => $testimonial['text'],
      'status' => $testimonial['status'],
      'id' => $testimonial['id']
    ])];
  }

  public static function delete($id)
  {
    $sql = 'DELETE FROM testimonials WHERE id = :id';
    $sth = self::$db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    return ['success' => $sth->execute(['id' => $id])];
  }
}
