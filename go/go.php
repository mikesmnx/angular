<?
	require './go.class.php';
	
	// angular по умолчанию передает не urlencoded, а json
	$params = json_decode(file_get_contents('php://input'), true);
	
	try {
		$town = (isset($params['town']) && $params['town']) ? mb_strtoupper($params['town']) : '';
		$entered = (isset($params['entered']) && $params['entered']) ? mb_strtoupper($params['entered']) : '';
	
		if (!$town) {
			throw new Exception('no town');
		}
		if (!$entered) {
			throw new Exception('no entered towns');
		}
		
		$goGame = new GoGame($town, array_map('trim', explode(',', $entered)));
		
		$res = $goGame->comp_move();
		
		echo json_encode($res);
	}
	catch (Exception $e) {
		echo json_encode(['error',  $e->getMessage()]);
	}
?>