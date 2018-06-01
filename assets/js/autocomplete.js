			function check_letters(str)
			{
				var check = false;
				var it2 = 0;

				for (var it = 0; it + research.length < str.length; it++)
					if (str[it] === research[0])
					{
						check = true;
						it2 = 0;
						while (str[it] === research[it2] && it2 < research.length)
						{
							it++;
							it2++;
						}
						return ((str[it - 1] === research[it2 - 1]) && (research[it2] === undefined)) ? true : false;
					}
				return false;
			}
			

			function filling()
			{

				for (var result_it = 0; result_it < result_box.length; result_it++)
					result_box[result_it].textContent = "";
				for (result_it = 0; result_it < printed_value.length; result_it++)
					result_box[result_it].textContent = printed_value[result_it]
			}

			function value_exist(tab, value)
			{
				for (var it = 0; it < tab.length; it++)
					if (tab[it] === value)
						return false
				return true
			}

			function fill_my_boxes() 
			{
				printed_value = [];
				for (var value_it = 0; value_it < values.length; value_it++)
				{
					if (check_letters(values[value_it]) === true)
						if (printed_value.length < 5)
							if (value_exist(printed_value, values[value_it]) === true)
								printed_value.push(values[value_it]);
				}
/*				console.log(printed_value)
*/				filling();
			}

			var values = [];
			var input_box = document.querySelector('.search');
			var result_box = document.querySelectorAll('.result');
			var printed_value = [];
			var research = "";

			for (var it_title = 0; it_title < datas.films.length; it_title++)
				values.push(datas.films[it_title].title);
			for (var it_author = 0; it_author < datas.films.length; it_author++)
				values.push(datas.films[it_author].author);

			input_box.addEventListener('keyup', function(event)
			{
				research = input_box.value;
				fill_my_boxes();
			});

