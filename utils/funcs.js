export function clickAwayListener(element, callback) {
  document.addEventListener("click", (e) => {
    if (!element.contains(e.target)) callback();
  });
}
let instance;

//classe que cria um eventListener que percorre uma lista de { HTMLElements, callbacks }, utilizada para fechar elementos expandiveis quando houver um clique fora deste elemento, recomendavel cadastrar apenas elementos que possuem ids unicos, para que o metodo remove funcione corretamente.
export class ClickAway {
  elementArr = [];
  constructor() {
    if (instance) {
      throw new Error("Nao podem ser criadas novas instancias");
    }
    document.addEventListener("click", (e) => {
      for (let ele of this.elementArr) {
        //passar o elemento de trigger ao callback para lidar com bubbleup de triggers que estejam fora do container foco do clickaway
        if (!ele?.node?.contains(e.target)) ele?.callback(e);
      }
    });
    instance = this;
  }

  register(node, callback) {
    this.elementArr.push({ node, callback });
  }

  remove(node) {
    this.elementArr = this.elementArr.filter((ele) => ele.id !== node.id);
  }
}
