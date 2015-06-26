<?
	require './go.class.php';
	
	assert_options(ASSERT_ACTIVE, 1);
	assert_options(ASSERT_WARNING, 0);
	assert_options(ASSERT_QUIET_EVAL, 1);
	
	function ahndl($file, $line, $code, $desc = '') {
		
		echo "	<hr>
				fail: 
				Файл '$file'<br />        Строка '$line'<br />
				Код '$code'<br />
				<b>$desc</b><hr />
			";
		
	}
	
	assert_options(ASSERT_CALLBACK, 'ahndl');
	
	// город, который ввел игрок - корректный
	$town = 'норильск';
	// город, который ввел игрок - несуществующий
	$err_town = 'москва1';
	// город, который ввел игрок начинается с другой буквы
	$wrong_town = 'омск';
	// город, который ввел игрок - уже вводили раньше
	$entered_town = 'анапа';
	// введенные города
	$entered = ['анапа', 'абакан'];
	// последняя буква из последнего города - корректная
	$correct_last = 'Н';
	// последняя буква из последнего города - некорректная
	$incorrect_last = 'А';
	
	$goGame = new GoGame($town, $entered);
	assert('$goGame->known_town() === 1', 'город есть, не находит');
	
	$goGame->set_player_town($err_town);
	assert('$goGame->known_town() === 0', 'города нет, находит');
	
	$goGame->set_player_town($town);
	assert('$goGame->get_last_letter() == $correct_last', "последняя буква (".$goGame->get_last_letter().") определена неверно (должна быть $correct_last)");
	assert('$goGame->get_last_letter() != $incorrect_last', "последняя буква (".$goGame->get_last_letter().") определена неверно (не должна быть $incorrect_last)");
	
	assert('$goGame->already_entered_town() === 0', 'город еще не введен - $town');
	
	$goGame->set_player_town($wrong_town);
	assert('$goGame->wrong_town() === 1', "город $wrong_town начинается с другой буквы");
	
	$goGame->set_player_town($town);
	assert('$goGame->wrong_town() === 0', "город $town начинается с правильной буквы");
	
	$goGame->set_player_town($entered_town);
	assert('$goGame->already_entered_town() === 1', "город уже введен - $entered_town");
	
	$goGame->set_player_town($town);
	print_r($goGame->comp_move());
?>