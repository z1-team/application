<?php

use ClickhouseClient\Client\Client;

class EventStore
{
  private $client;

  public function __construct($config)
  {
    $this->client = new Client($config);
  }

  public function save($event) {
    $this->client->writeRows('insert into analytics.events', [
      [
        'EventName' => $event->name(),
        'YClickId' => $event->yClickId(),
        'ClientId' => $event->clientId(),
        'UtmCampaign' => $event->utmCampaign(),
        'UtmExtraKeys' => $event->utmExtraKeys(),
        'UtmExtraValues' => $event->utmExtraValues(),
        'EventExtraKeys' => $event->eventExtraKeys(),
        'EventExtraValues' => $event->eventExtraValues(),
        'EventDate' => $event->date(),
        'EventDateTime' => $event->dateTime(),
        'UserIP' => $event->userIP(),
        'UserRegion' => $event->userRegion(),
        'UserCity' => $event->userCity(),
        'UserLocalTime' => $event->userLocalTime(),
        'ExtraKeys' => $event->extraKeys(),
        'ExtraValues' => $event->extraValues(),
        'EventVersion' => 1
      ]
    ]);
  }
}
