
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 1,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "bulk"
}

function recarregarParametros(){
    $("#quantidade").val(parametros_pesquisa.quantidade);
    if(parametros_pesquisa.cor=="branca"){
        $("#branca").addClass("selected");
        $("#colorida").removeClass("selected");
    }else{
        $("#colorida").addClass("selected");
        $("#branca").removeClass("selected");
    }

    if(parametros_pesquisa.gola=="gola_v"){
        $("#gola_v").addClass("selected");
        $("#gola_normal").removeClass("selected");
    }else{
        $("#gola_normal").addClass("selected");
        $("#gola_v").removeClass("selected");
    }

    if(parametros_pesquisa.qualidade=="q150"){
        $("#q150").addClass("selected");
        $("#q190").removeClass("selected");
    }else{
        $("#q190").addClass("selected");
        $("#q150").removeClass("selected");
    }

    $("#estampa").val(parametros_pesquisa.estampa);
    $("#embalagem").val(parametros_pesquisa.embalagem);
}

function carregarDetalhes(){
    var quantidade = parametros_pesquisa.quantidade;
    var cor = parametros_pesquisa.cor;
    var gola = parametros_pesquisa.gola;
    var qualidade = parametros_pesquisa.qualidade;
    var estampa = parametros_pesquisa.estampa;
    var embalagem = parametros_pesquisa.embalagem;
    var adicionalPorEmbalagem = 0;
    var desconto = 0;
    
    $("#result_quantidade").text(quantidade);
    $("#result_cor").text(cor);
    $("#result_gola").text(gola=="gola_v" ? "V" : "Normal");
    $("#result_qualidade").text(qualidade=="q150" ? "Normal (150g / m2)" : "Alta (190g / m2)");
    $("#result_estampa").text(estampa=="com_estampa" ? "Com estampa" : "Sem estampa");
    $("#result_embalagem").text(embalagem=="bulk" ? "Bulk - Sem Plástico" : "Unitária - Plástico");
    
    var fotoProduto = "img/" + camisetas[cor][gola][estampa].foto;
    $("#foto-produto").attr("src", fotoProduto);
    
    var precoUnitario = camisetas[cor][gola][estampa].preco_unit;
    if(qualidade == "q190"){
        precoUnitario += (precoUnitario * 0.12);
    }
    
    if(embalagem == "unitaria"){
        adicionalPorEmbalagem = quantidade * 0.15;
    }

    var preco = quantidade * precoUnitario;

    if(quantidade >= 1000){
        desconto = 0.15;
    }else if(quantidade >= 500){
        desconto = 0.10;
    }else if(quantidade >= 100){
        desconto = 0.05;
    }

    preco -= (preco * desconto);
    preco += adicionalPorEmbalagem;

    $("#valor-total").text(preco.toFixed(2).replace(".",","));
    localStorage.setItem(("ultimoOrcamento"), JSON.stringify(parametros_pesquisa));
}

$(function(){
    
    //Buscar parâmetrosPesquisa em localStorage
    if(localStorage.getItem("ultimoOrcamento")){
        parametros_pesquisa = JSON.parse(localStorage.getItem("ultimoOrcamento"));
    }
    
    recarregarParametros();
    carregarDetalhes();

    //Quantidade
    $("#quantidade").change(function(){
        var quantidade = $("#quantidade").val();
        if(quantidade==""){
            quantidade = 1;
            $("#quantidade").val(quantidade);
        }
        parametros_pesquisa.quantidade = quantidade;
        carregarDetalhes();
    });

    //Filtro Cor
    $("#branca").click(function(){
        $("#branca").addClass("selected");
        $("#colorida").removeClass("selected");
        parametros_pesquisa.cor = "branca";
        carregarDetalhes();
    });
    $("#colorida").click(function(){
        $("#branca").removeClass("selected");
        $("#colorida").addClass("selected");
        parametros_pesquisa.cor = "colorida";
        carregarDetalhes();
    });

    //Filtro Gola
    $("#gola_v").click(function(){
        $("#gola_v").addClass("selected");
        $("#gola_normal").removeClass("selected");
        parametros_pesquisa.gola = "gola_v";
        carregarDetalhes();
    });
    $("#gola_normal").click(function(){
        $("#gola_normal").addClass("selected");
        $("#gola_v").removeClass("selected");
        parametros_pesquisa.gola = "gola_normal";
        carregarDetalhes();
    });

    //Filtro Qualidade tecido
    $("#q150").click(function(){
        $("#q150").addClass("selected");
        $("#q190").removeClass("selected");
        parametros_pesquisa.qualidade = "q150";
        carregarDetalhes();
    });
    $("#q190").click(function(){
        $("#q190").addClass("selected");
        $("#q150").removeClass("selected");
        parametros_pesquisa.qualidade = "q190";
        carregarDetalhes();
    });
    
    //Filtro Estampa
    $("#estampa").change(function(){
        parametros_pesquisa.estampa = $("#estampa").val();
        carregarDetalhes();
    });

    //Filtro Embalagem
    $("#embalagem").change(function(){
        parametros_pesquisa.embalagem = $("#embalagem").val();
        carregarDetalhes();
    });
    
    // Se quiser uma sugestão dos passos a seguir para a resolução, veja mais abaixo.
    
});














// Sugestão de etapas da resolução

    // 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o 
    // valor no console para testar se está certo.

    // 2. Faça os eventos click e change para os filtros.
    
        // a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click, 
        // remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
        // que ele fique azul.

        // b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.

        // c. Sempre que um dos eventos acima ocorrer, atualize a variável "parametros_pesquisa" e rode a função para 
        // calcular o preço

    
    // 3. Altere a função do cálculo do preço. Em vez de soltar os valores no console, atualize as informações
    // nos elementos "result_", atualize o preço no elemento "valor-total" e mude o atributo "src" do elemento 
    // "foto-produto" para alterar a imagem mostrada (todas as imagens estão na pasta img).

    // 4. Adicione a funcionalidade de hide e show do spinner (elemento "refresh-loader") à função de cálculo de preço. 
    // Como não estamos consultando dados externos, o cálculo acaba sendo rápido demais, portanto use um setTimeout 
    // para deixar ele aparecer por pelo menos 2 segundos.

    // 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage, 
    // atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço