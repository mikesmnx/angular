<?
	class GoGame {
		const TOWNS_FILE = './towns.serialize';
		const GOOD_STARTERS = 28;
		
		private $not_so_good = ['Ё', 'Й', 'Ъ', 'Ы', 'Ь'];
		private $player_town = '';
		private $used_towns = [];
		private $entered = [];
		private $all_towns = [];
	
		function __construct($player_town, $entered = []) {
			try {
				if (!file_exists($this::TOWNS_FILE)) {
					throw new Exception('no file');
				}
				
				$cont = file_get_contents($this::TOWNS_FILE);
		
				if (strlen($cont) > 0) {
					$towns = unserialize($cont);
				}
				else {
					throw new Exception('empty file');
				}
				
				if (!is_array($towns) or count($towns) < $this::GOOD_STARTERS) {
					throw new Exception('bad file');
				}
				
				$this->all_towns = $towns;
				
				$entered = array_map('mb_strtoupper', $entered);
				
				foreach ($entered as $town) {
					if ($town) {
						$this->used_towns[$town] = 1;
						$this->entered[] = $town;
					}
				}
				
				$this->player_town = mb_strtoupper($player_town);
			}
			catch (Exception $e) {
				echo json_encode(['error',  $e->getMessage()]);
			}
		}
		
		public function set_player_town($town) {
			$this->player_town = mb_strtoupper($town);
		}
		
		public function get_last_letter() {
			$last_town = $this->entered[count($this->entered) - 1];
			
			$last_letter = '';
			for ($k = mb_strlen($last_town) - 1; $k >= 0; $k--) {
				$last_letter = mb_substr($last_town, $k, 1);
				
				if (!in_array($last_letter, $this->not_so_good)) {
					break;
				}
			}
			
			return $last_letter;
		}
		
		public function get_town($start) {
			$town = '';
			
			if ($start and isset($this->all_towns[$start])) {
				foreach ($this->all_towns[$start] as $curr_town) {
					if (!isset($this->used_towns[$curr_town])) {
						$town = $curr_town;
						
						break;
					}
				}
			}
			
			return $town;
		}
		
		public function comp_move() {
			$res = [
				'state' => 'lost',
				'error' => ''
			];
			
			if ($this->wrong_town()) {
				$res['state'] = 'wrong_letter';
				return $res;
			}
			
			if (!$this->known_town()) {
				$res['state'] = 'unknown_town';
				return $res;
			}
			
			if ($this->already_entered_town()) {
				$res['state'] = 'already_entered_town';
				return $res;
			}
			
			$this->entered[] = $this->player_town;
			
			$last_letter = $this->get_last_letter();
			
			$comp_town = $this->get_town($last_letter);
			if ($comp_town) {
				$this->last_town = $comp_town;
				$this->used_towns[$comp_town] = 1;
				$this->entered[] = $comp_town;
				
				$res = [
					'state' => 'new_town',
					'town' => $comp_town,
					'last_letter' => $this->get_last_letter()
				];
			}
			
			return $res;
		}
		
		public function known_town() {
			$first_letter = mb_substr($this->player_town, 0, 1);
			
			return in_array($this->player_town, $this->all_towns[$first_letter]) ? 1 : 0;
		}
		
		public function already_entered_town() {
			return in_array($this->player_town, $this->entered) ? 1 : 0;
		}
		
		public function wrong_town() {
			$last_letter = $this->get_last_letter();
			
			return ($last_letter != mb_substr($this->player_town, 0, 1)) ? 1 : 0;
		}
	}
?>