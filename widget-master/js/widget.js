class LeMondeWidget extends Widget {
	
	constructor(id, app) {
		super(id, LeMondeModel, LeMondeView, LeMondeController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = false;
		this.sizeX = 2;
		this.sizeY = 2;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();
		
		this.controller.load();
	}
	
}

class LeMondeModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class LeMondeView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
		this.link = HH.create("a");
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		this.stage.appendChild(this.link);
		
		let height = (this.try.mvc.main.header ? 25 : 0) + (this.try.mvc.main.footer ? 25 : 0);
		this.try.numberContainer = HTML.create("div");
		CSS.style(this.try.numberContainer, {"paddingTop": height / 2 + "px", "width": "100%", "height": "calc(100% - " + height + "px)", "lineHeight": "calc(100%)", "textAlign": "center", "fontSize": "55px"});
		this.try.numberContainer.innerHTML = 0;
		this.try.stage.appendChild(this.try.numberContainer);
		
		this.try.footer.innerHTML = "refresh";
		CSS.style(this.try.footer, {"userSelect": "none", "cursor": "pointer"});
		Events.on(this.try.footer, "click", event => this.try.mvc.controller.refreshClick());
		this.try.stage.appendChild(this.try.footer);
		
		
	}
	
	update(title, link) {
		this.link.innerHTML = title;
		HH.attr(this.link, {"href": "https://www.lemonde.fr" + link, "target": "_blank"});
	}
	
}

class LeMondeController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	async load() {
		let result = await this.mvc.main.dom("https://lemonde.fr"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('//*[@id="en-continu"]/div/ul/li[1]/a').firstResult; // find interesting things
		this.mvc.view.update(article.textContent, article.getAttribute("href"));
	}
	
}
