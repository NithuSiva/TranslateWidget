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
		//this.controller.load();
		
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
		
		this.stage.appendChild(this.footer);
		
		this.afficher = HH.create("p");
		this.stage.appendChild(this.afficher);
		
		
        
	}
	
	

	

	
	update(mot1, mot2, mot3) {
		if(!mot3){
			if(!mot2){
				this.afficher.innerHTML = mot1;
			} else {
				this.afficher.innerHTML = mot1 + ", " + mot2;
			}
		} else {
			this.afficher.innerHTML = mot1 + ", " + mot2 +", " + mot3;
		}
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
		this.tableauLangue = ["francais","anglais","allemand","espagnol","portugais"]; //liste contenant les langues.
		
		this.tableauLangueTaille = this.tableauLangue.length;
		
		var i = 0;
		
		this.langueDeBase = document.createElement("select");
		this.langueDeBase.setAttribute("id", "langueBase");
		
     	        this.langueDeTraduction = document.createElement("select");
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
	
	async valider() {
		this.langue = ["fr","en","de","es","pt"];
		
		this.mot = document.getElementById("ChampTexte").value; // variable contenant la valeur contenue dans le champ texte.
		console.log(this.mot);
		
        	this.baseChoix = langueBase.selectedIndex;  // variable qui contient le choix de la langue du mot.
        	this.tradChoix = langueTrad.selectedIndex; // variable qui contient le choix de langue dans lequel sera traduit le mot.
		
		this.lien = "https://context.reverso.net/traduction/" + this.tableauLangue[this.baseChoix] + "-" +  this.tableauLangue[this.tradChoix] + "/" + this.mot;
		console.log(this.lien);
		
		let result = await this.mvc.main.dom(this.lien); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		
		this.article1 = new xph().doc(dom).ctx(dom).craft('//*[@id="translations-content"]/a[1]').firstResult; // find interesting things
		this.article2 = new xph().doc(dom).ctx(dom).craft('//*[@id="translations-content"]/a[2]').firstResult; // find interesting things
		this.article3 = new xph().doc(dom).ctx(dom).craft('//*[@id="translations-content"]/a[3]').firstResult; // find interesting things
		
		if(!this.article3){
			if(!this.article2){
				if(!this.article1){
					this.mvc.view.update(" aucune traduction trouver :(");
				} else {
				this.mvc.view.update(this.article1.textContent);
				}
			} else {
			this.mvc.view.update(this.article1.textContent, this.article2.textContent);
			}
		} else {
		this.mvc.view.update(this.article1.textContent, this.article2.textContent, this.article3.textContent);
		}
	}
	
}
