class TraductionWidget extends Widget {
	
	constructor(id, app) {
		super(id, TraductionModel, TraductionView, TraductionController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 2;
		this.sizeY = 1;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();
		
		this.controller.load();
	}
	
}

class TraductionModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class TraductionView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
		
		this.bloc = HH.create("input"); //creer un champ texte. id = "ChampTexte" size = "39" type = "text"
     	        this.bloc.setAttribute("id", "ChampTexte");
		this.bloc.setAttribute("size", "39");
		this.bloc.setAttribute("type", "text");
		this.stage.appendChild(this.bloc);

		this.langueBase = HH.create("select"); //creer une liste deroulante pour la langue du mot. id = "langueBase"
		this.langueBase.setAttribute("id", "langueBase");


		this.francais1 = HH.create("option"); //contenue de la liste "langueBase"
		this.francais1.innerHTML = "Francais";

		this.langueBase.appendChild(this.francais1); 

		this.anglais1 = HH.create("option"); //contenue de la liste "langueBase"
		this.anglais1.innerHTML = "Anglais";

		this.langueBase.appendChild(this.anglais1); 

		this.stage.appendChild(this.langueBase); //mise en forme
        
                this.langueTrad = HH.create("select"); //creer une liste deroulante pour la langue du mot a traduire. id = "langueTrad"
                this.langueTrad.setAttribute("id", "langueTrad");
        
                this.francais2 = HH.create("option"); //contenue de la liste "langueTrad"
		this.francais2.innerHTML = "Francais";

		this.langueTrad.appendChild(this.francais2); 

		this.anglais2 = HH.create("option"); //contenue de la liste "langueTrad"
		this.anglais2.innerHTML = "Anglais";

		this.langueTrad.appendChild(this.anglais2);

		this.stage.appendChild(this.langueTrad); //mise en forme
		
		this.afficher = HH.create("a");
		this.stage.appendChild(this.afficher);
        
                this.footer.innerHTML = "valider";  // mise en forme du footer permettant de valider les valeur et choix entrer.
		SS.style(this.footer, {"userSelect": "none", "cursor": "pointer"});
		this.click = this.footer.addEventListener("click", event => this.mvc.controller.valider());
		// Events.on(this.footer, "click", event => this.mvc.controller.valider());
		this.stage.appendChild(this.footer);
		
        
	}
	
	update(title) {
		this.afficher.innerHTML = title;
		//HH.attr(this.link, {"href": "https://www.lemonde.fr" + link, "target": "_blank"});
	}
	
	
	
}

class TraductionController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	valider() {
		this.tableauLangue = ["fr","en"]; //liste contenant les langues.
		this.mot = document.getElementById("ChampTexte").value; // variable contenant la valeur contenue dans le champ texte.
      	        console.log(this.mot);
		this.base = document.getElementById("langueBase").selectIndex; 
        	this.baseChoix = langueBase.selectedIndex;  // variable qui contient le choix de la langue du mot
        	this.trad = document.getElementById("langueTrad").selectIndex;
        	this.tradChoix = langueTrad.selectedIndex; // variable qui contient le choix de langue dans lequel sera traduit le mot.
        	//alert("[" + this.mot + "]" + " " + this.tableauLangue[this.baseChoix] + " -->" + " " + this.tableauLangue[this.tradChoix] + " " );
		this.lien = "https://www.wordreference.com/" + this.tableauLangue[this.baseChoix] + this.tableauLangue[this.tradChoix] + "/" + this.mot;
		console.log(this.lien);
	}
	
		
	/*async load() {
		let link = await this.mvc.controller.valider();
		let result = await this.mvc.main.dom(link); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		this.article = new xph().doc(dom).ctx(dom).craft('//*[@id="dictionary"]/div[1]/div[1]/div[1]/div/div/div/div/div[1]/h3/span[1]/a').firstResult; // find interesting things
		this.mvc.view.update(this.article.textContent);
		//alert(article.textContent);
		}
		*/
		
		
	
		

	
	
    
	
	
	
	
	
}
