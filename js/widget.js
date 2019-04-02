class TraductionWidget extends Widget {
	
	constructor(id, app) {
		super(id, TraductionModel, TraductionView, TraductionController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 2;
		this.sizeY = 0.8;
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
		
		this.mvc.controller.select();
        
                this.footer.innerHTML = "valider";  // mise en forme du footer permettant de valider les valeur et choix entrer.
		SS.style(this.footer, {"userSelect": "none", "cursor": "pointer"});
		this.click = this.footer.addEventListener("click", event => this.mvc.controller.valider());
		// Events.on(this.footer, "click", event => this.mvc.controller.valider());
		this.stage.appendChild(this.footer);
		
		this.afficher = HH.create("p");
		this.stage.appendChild(this.afficher);
		
		
        
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
	
	select() { //metode qui creer des liste déroulante 
		this.tableauLangue = ["francais","anglais","allemand","espagnol","portugais","italien"]; //liste contenant les langues.
		this.tableauLangueTaille = this.tableauLangue.length;
		var i = 0;
		this.langueDeBase = document.createElement("select");
     	        this.langueDeTraduction = document.createElement("select");
		this.langueDeBase.setAttribute("id", "langueBase");
		this.langueDeTraduction.setAttribute("id", "langueTrad");
		for(i=0;i<this.tableauLangueTaille;i++){
			var langue = document.createElement("option");
			langue.innerHTML = this.tableauLangue[i];
			this.langueDeBase.appendChild(langue);
       			 }
       	 	for(i=0;i<this.tableauLangueTaille;i++){
			var langue = document.createElement("option");
			langue.innerHTML = this.tableauLangue[i];
			this.langueDeTraduction.appendChild(langue);
     		 	 }
	 	this.mvc.view.stage.appendChild(this.langueDeBase);
   	   	this.mvc.view.stage.appendChild(this.langueDeTraduction);
		}
	
	valider() {
		
		this.mot = document.getElementById("ChampTexte").value; // variable contenant la valeur contenue dans le champ texte.
      	       // this.mot = "prenom";
		console.log(this.mot);
		this.base = document.getElementById("langueBase").selectIndex; 
        	this.baseChoix = langueBase.selectedIndex;  // variable qui contient le choix de la langue du mot
        	this.trad = document.getElementById("langueTrad").selectIndex;
        	this.tradChoix = langueTrad.selectedIndex; // variable qui contient le choix de langue dans lequel sera traduit le mot.
        	//alert("[" + this.mot + "]" + " " + this.tableauLangue[this.baseChoix] + " -->" + " " + this.tableauLangue[this.tradChoix] + " " );
		this.lien = "https://www.linguee.fr/" + this.tableauLangue[this.baseChoix] + "-" + this.tableauLangue[this.tradChoix] + "/search?source=auto&query=" + this.mot;
		//return this.lien;
		console.log(this.lien);
	}
		
	async load(link) {
		let result = await this.mvc.main.dom(link); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		this.article = new xph().doc(dom).ctx(dom).craft('//*[@id="dictionary"]/div[1]/div[1]/div[1]/div/div/div/div/div[1]/h3/span[1]/a[1]').firstResult; // find interesting things
		this.mvc.view.update(this.article.textContent);
		//alert(article.textContent);
		}
		
		
		
	
		

	
	
    
	
	
	
	
	
}
