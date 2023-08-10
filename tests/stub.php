<?php

declare(strict_types=1);

namespace OC\Hooks {
	class Emitter {
	}
}

namespace OC\AppFramework\OCS {
	class BaseResponse {
	}
}

namespace OCA\Files\Event {
	class LoadAdditionalScriptsEvent extends \OCP\EventDispatcher\Event {
	}
}

namespace OCA\Viewer\Event {
	class LoadViewer extends \OCP\EventDispatcher\Event {
	}
}

namespace OCA\Files_Sharing\Event {
	abstract class BeforeTemplateRenderedEvent extends \OCP\EventDispatcher\Event {
		abstract public function getShare(): \OCP\Share\IShare;
	}
}

namespace OC\User {
	class NoUserException extends \Exception {
	}
}

namespace OCA\Files_Sharing {
	abstract class SharedStorage implements \OCP\Files\Storage\IStorage {
		abstract public function getShare(): \OCP\Share\IShare;
	}
}

namespace OCA\TPAssistant\Event {

	use OCP\TextProcessing\Task;

	abstract class BeforeAssistantNotificationEvent extends \OCP\EventDispatcher\Event {
		abstract public function getTask(): Task;
		abstract public function setWantsNotification(bool $wantsNotification): void;
		abstract public function setNotificationTarget(?string $notificationTarget): void;
	}
}
