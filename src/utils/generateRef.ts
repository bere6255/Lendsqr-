export default ({type}: {type: string}) => {
	let text = "";
	const possible = "123456789";
	for (let i = 0; i < 11; i++) {
	  const sup = Math.floor(Math.random() * possible.length);
	  text += i > 0 && sup === i ? "0" : possible.charAt(sup);
	}
	const todaysDate = new Date().toISOString().slice(0, 10).replace(/-/g, "")
	return  `lendsqr_${type}_${todaysDate}${text}`;;
};