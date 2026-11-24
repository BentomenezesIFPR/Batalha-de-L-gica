export type TopicId =
  | 'variaveis'
  | 'if'
  | 'else'
  | 'for'
  | 'while'
  | 'arrays'
  | 'operadores';

export interface Question {
  id: string;
  topic: TopicId;
  topicLabel: string;
  prompt: string;
  code?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const TOPIC_LABELS: Record<TopicId, string> = {
  variaveis: 'Variáveis',
  if: 'Condicional if',
  else: 'Condicional else',
  for: 'Laço for',
  while: 'Laço while',
  arrays: 'Arrays (Listas)',
  operadores: 'Operadores Lógicos',
};

export const QUESTION_BANK: Question[] = [
  // VARIÁVEIS
  {
    id: 'var-1',
    topic: 'variaveis',
    topicLabel: 'Variáveis',
    prompt: 'Qual será o valor final da variável "pontos" após executar o código abaixo?',
    code: `let pontos = 10;\npontos = pontos + 5;\npontos = 20;`,
    options: ['10', '15', '20', '35'],
    correctIndex: 2,
    explanation:
      'Variáveis guardam apenas o último valor atribuído. A linha "pontos = 20" substitui o valor 15 que estava guardado antes.',
  },
  {
    id: 'var-2',
    topic: 'variaveis',
    topicLabel: 'Variáveis',
    prompt: 'Observe a troca de valores usando uma variável auxiliar "temp". Quais serão os valores finais de "a" e "b"?',
    code: `let a = 4;\nlet b = 7;\nlet temp = a;\na = b;\nb = temp;`,
    options: [
      'a = 4 e b = 7',
      'a = 7 e b = 4',
      'a = 7 e b = 7',
      'a = 4 e b = 4',
    ],
    correctIndex: 1,
    explanation:
      '"temp" guarda o valor original de "a" (4) antes de "a" receber o valor de "b" (7). Depois, "b" recebe o valor salvo em "temp" (4).',
  },
  {
    id: 'var-3',
    topic: 'variaveis',
    topicLabel: 'Variáveis',
    prompt: 'O que acontece ao tentar executar o código abaixo em JavaScript?',
    code: `const limite = 100;\nlimite = 200;`,
    options: [
      'A variável limite passa a valer 200',
      'A variável limite passa a valer 300',
      'Ocorre um erro, pois "const" não pode ser reatribuída',
      'O valor continua 100 sem nenhum aviso ou erro',
    ],
    correctIndex: 2,
    explanation:
      'Declarações feitas com "const" criam constantes cujo valor não pode receber uma nova atribuição após serem definidas.',
  },
  {
    id: 'var-4',
    topic: 'variaveis',
    topicLabel: 'Variáveis',
    prompt: 'Qual será o resultado armazenado na variável "resultado" no trecho abaixo?',
    code: `let idade = "15";\nlet resultado = idade + 5;`,
    options: ['20', '"155"', '15', '10'],
    correctIndex: 1,
    explanation:
      'Como "15" está entre aspas, ele é um texto (string). Ao usar "+", o código junta os dois valores (concatenação), formando "155".',
  },

  // IF
  {
    id: 'if-1',
    topic: 'if',
    topicLabel: 'Condicional if',
    prompt: 'O que será exibido no console após a execução deste código?',
    code: `let energia = 80;\nif (energia >= 50) {\n  console.log("Avançar");\n}`,
    options: ['"Avançar"', 'Nada será exibido', '"energia"', '80'],
    correctIndex: 0,
    explanation:
      'A condição "80 >= 50" é verdadeira, portanto o bloco dentro do "if" é executado e exibe "Avançar".',
  },
  {
    id: 'if-2',
    topic: 'if',
    topicLabel: 'Condicional if',
    prompt: 'O que aparecerá no console quando o código abaixo for executado?',
    code: `let moedas = 15;\nif (moedas > 20) {\n  console.log("Bônus!");\n}\nconsole.log("Fim");`,
    options: [
      '"Bônus!" e depois "Fim"',
      'Apenas "Bônus!"',
      'Apenas "Fim"',
      'Nada será exibido',
    ],
    correctIndex: 2,
    explanation:
      'Como 15 não é maior que 20, o bloco do "if" é pulado. A linha "console.log("Fim")" está fora do "if" e sempre executa.',
  },
  {
    id: 'if-3',
    topic: 'if',
    topicLabel: 'Condicional if',
    prompt: 'Qual será o valor final da variável "bonus"?',
    code: `let nivel = 5;\nlet bonus = 0;\nif (nivel === 5) {\n  bonus = 10;\n}\nif (nivel > 3) {\n  bonus = bonus + 5;\n}`,
    options: ['0', '5', '10', '15'],
    correctIndex: 3,
    explanation:
      'Os dois blocos "if" são independentes e ambos são verdadeiros para nivel = 5. Primeiro bonus vira 10, depois soma +5, totalizando 15.',
  },
  {
    id: 'if-4',
    topic: 'if',
    topicLabel: 'Condicional if',
    prompt: 'Qual é a função principal da estrutura condicional "if" em um algoritmo?',
    options: [
      'Repetir uma instrução exatamente 10 vezes',
      'Executar um bloco de código apenas se uma condição for verdadeira',
      'Criar uma lista ordenada de números',
      'Apagar variáveis da memória do computador',
    ],
    correctIndex: 1,
    explanation:
      'O comando "if" (se) avalia uma expressão lógica: se ela resultar em verdadeiro (true), o bloco interno é executado.',
  },

  // ELSE
  {
    id: 'else-1',
    topic: 'else',
    topicLabel: 'Condicional else',
    prompt: 'Qual valor a variável "status" receberá ao final da execução?',
    code: `let nota = 6;\nlet status = "";\nif (nota >= 7) {\n  status = "Aprovado";\n} else {\n  status = "Recuperação";\n}`,
    options: ['"Aprovado"', '"Recuperação"', '"" (vazio)', '6'],
    correctIndex: 1,
    explanation:
      'Como 6 >= 7 é falso, o programa desvia para o bloco "else", atribuindo "Recuperação" à variável "status".',
  },
  {
    id: 'else-2',
    topic: 'else',
    topicLabel: 'Condicional else',
    prompt: 'Analise a variável booleana "chuva". Qual será o valor final de "acao"?',
    code: `let chuva = false;\nlet acao = "";\nif (chuva) {\n  acao = "Levar guarda-chuva";\n} else {\n  acao = "Ir de bicicleta";\n}`,
    options: [
      '"Levar guarda-chuva"',
      '"Ir de bicicleta"',
      'false',
      'true',
    ],
    correctIndex: 1,
    explanation:
      'Quando "chuva" vale false, a condição do "if" não é atendida, então o código executa o caminho alternativo no "else".',
  },
  {
    id: 'else-3',
    topic: 'else',
    topicLabel: 'Condicional else',
    prompt: 'Qual mensagem será guardada na variável "categoria" para idade = 16?',
    code: `let idade = 16;\nlet categoria = "";\nif (idade >= 18) {\n  categoria = "Adulto";\n} else if (idade >= 12) {\n  categoria = "Jovem";\n} else {\n  categoria = "Criança";\n}`,
    options: ['"Adulto"', '"Jovem"', '"Criança"', 'Nenhuma das anteriores'],
    correctIndex: 1,
    explanation:
      '16 >= 18 é falso, então o programa testa o "else if": 16 >= 12 é verdadeiro! Assim, "categoria" recebe "Jovem" e o último "else" é ignorado.',
  },
  {
    id: 'else-4',
    topic: 'else',
    topicLabel: 'Condicional else',
    prompt: 'Em uma estrutura "if ... else", quando o bloco dentro do "else" é executado?',
    options: [
      'Sempre, logo após o bloco do if',
      'Somente quando a condição do if for falsa',
      'Apenas quando o programa tem um laço for',
      'Somente quando duas condições são verdadeiras ao mesmo tempo',
    ],
    correctIndex: 1,
    explanation:
      'O "else" (senão) funciona como plano B: ele só entra em ação quando a condição testada pelo "if" resulta em falso.',
  },

  // FOR
  {
    id: 'for-1',
    topic: 'for',
    topicLabel: 'Laço for',
    prompt: 'Qual será o valor final da variável "total" após o término do laço for?',
    code: `let total = 0;\nfor (let i = 1; i <= 4; i++) {\n  total = total + i;\n}`,
    options: ['4', '6', '10', '15'],
    correctIndex: 2,
    explanation:
      'O laço soma os valores de i de 1 até 4: 0 + 1 + 2 + 3 + 4 = 10.',
  },
  {
    id: 'for-2',
    topic: 'for',
    topicLabel: 'Laço for',
    prompt: 'Quantas vezes a palavra "Olá" será exibida no console?',
    code: `for (let i = 0; i < 5; i++) {\n  console.log("Olá");\n}`,
    options: ['4 vezes', '5 vezes', '6 vezes', 'Nenhuma vez'],
    correctIndex: 1,
    explanation:
      'O contador "i" assume os valores 0, 1, 2, 3 e 4. Quando chega a 5, "5 < 5" é falso e o laço para. Total: 5 repetições.',
  },
  {
    id: 'for-3',
    topic: 'for',
    topicLabel: 'Laço for',
    prompt: 'Observe que o incremento é "i += 2". Qual será o texto final?',
    code: `let texto = "";\nfor (let i = 2; i <= 6; i += 2) {\n  texto = texto + i;\n}`,
    options: ['"23456"', '"246"', '"24"', '"0246"'],
    correctIndex: 1,
    explanation:
      '"i" começa em 2 e aumenta de 2 em 2 (2, 4, 6). Juntando esses números como texto, obtemos "246".',
  },
  {
    id: 'for-4',
    topic: 'for',
    topicLabel: 'Laço for',
    prompt: 'Quais são as três partes dentro dos parênteses de um laço "for" tradicional?',
    options: [
      'Entrada, processamento e saída',
      'Inicialização, condição de parada e incremento/passo',
      'Variável, array e operador lógico',
      'Se, senão e retorno',
    ],
    correctIndex: 1,
    explanation:
      'Um laço "for (inicio; condicao; passo)" define onde o contador começa, até quando ele continua e como ele muda a cada volta.',
  },

  // WHILE
  {
    id: 'while-1',
    topic: 'while',
    topicLabel: 'Laço while',
    prompt: 'Qual será o valor da variável "x" quando o laço while terminar?',
    code: `let x = 3;\nwhile (x > 0) {\n  x = x - 1;\n}`,
    options: ['3', '1', '0', '-1'],
    correctIndex: 2,
    explanation:
      'x diminui para 2, depois 1 e depois 0. Quando x vale 0, a condição "0 > 0" torna-se falsa e o laço é encerrado.',
  },
  {
    id: 'while-2',
    topic: 'while',
    topicLabel: 'Laço while',
    prompt: 'Quantas vezes o código dentro deste laço while será executado?',
    code: `let passos = 1;\nwhile (passos < 1) {\n  passos = passos + 5;\n}`,
    options: ['0 vezes', '1 vez', '5 vezes', 'Infinitas vezes'],
    correctIndex: 0,
    explanation:
      'O "while" testa a condição antes de executar. Como "1 < 1" já começa falso, o bloco interno não roda nenhuma vez.',
  },
  {
    id: 'while-3',
    topic: 'while',
    topicLabel: 'Laço while',
    prompt: 'Qual será o valor final da variável "n" após a execução completa do laço?',
    code: `let n = 1;\nwhile (n < 8) {\n  n = n * 2;\n}`,
    options: ['4', '6', '8', '16'],
    correctIndex: 2,
    explanation:
      'n começa em 1 (< 8) -> vira 2 (< 8) -> vira 4 (< 8) -> vira 8. Como "8 < 8" é falso, o laço para com n valendo 8.',
  },
  {
    id: 'while-4',
    topic: 'while',
    topicLabel: 'Laço while',
    prompt: 'O que acontece se a condição de um laço "while" permanecer sempre verdadeira?',
    options: [
      'O laço para automaticamente após 100 repetições',
      'O programa entra em um loop infinito',
      'O código pula para o próximo bloco else',
      'A variável se transforma em um array',
    ],
    correctIndex: 1,
    explanation:
      'Sem uma mudança que torne a condição falsa em algum momento, o "while" continua repetindo sem parar (loop infinito).',
  },

  // ARRAYS
  {
    id: 'arr-1',
    topic: 'arrays',
    topicLabel: 'Arrays (Listas)',
    prompt: 'O que será exibido no console ao acessar a posição [1] do array?',
    code: `let frutas = ["Maçã", "Banana", "Uva"];\nconsole.log(frutas[1]);`,
    options: ['"Maçã"', '"Banana"', '"Uva"', 'undefined'],
    correctIndex: 1,
    explanation:
      'Em programação, a contagem de índices de um array começa em 0: posição [0] é "Maçã" e posição [1] é "Banana".',
  },
  {
    id: 'arr-2',
    topic: 'arrays',
    topicLabel: 'Arrays (Listas)',
    prompt: 'Qual será o resultado da soma exibida no console?',
    code: `let nums = [5, 10, 15, 20];\nconsole.log(nums[0] + nums[2]);`,
    options: ['15', '20', '25', '30'],
    correctIndex: 1,
    explanation:
      'nums[0] é o primeiro item (5) e nums[2] é o terceiro item (15). Somando os dois: 5 + 15 = 20.',
  },
  {
    id: 'arr-3',
    topic: 'arrays',
    topicLabel: 'Arrays (Listas)',
    prompt: 'Qual será o conteúdo final do array "fila" após o método push()?',
    code: `let fila = ["Ana", "Beto"];\nfila.push("Caio");`,
    options: [
      '["Caio", "Ana", "Beto"]',
      '["Ana", "Beto", "Caio"]',
      '["Ana", "Caio"]',
      '["Caio"]',
    ],
    correctIndex: 1,
    explanation:
      'O método "push()" adiciona um novo elemento exatamente no final da lista, mantendo a ordem dos anteriores.',
  },
  {
    id: 'arr-4',
    topic: 'arrays',
    topicLabel: 'Arrays (Listas)',
    prompt: 'Qual valor será retornado pela propriedade ".length" neste código?',
    code: `let letras = ["A", "B", "C", "D"];\nlet tamanho = letras.length;`,
    options: ['3', '4', '5', '"D"'],
    correctIndex: 1,
    explanation:
      'A propriedade ".length" informa a quantidade total de elementos dentro do array. Como há 4 letras, o tamanho é 4.',
  },

  // OPERADORES LÓGICOS
  {
    id: 'op-1',
    topic: 'operadores',
    topicLabel: 'Operadores Lógicos',
    prompt: 'Qual será o valor booleano da variável "entra" usando o operador && (E)?',
    code: `let temChave = true;\nlet portaAberta = false;\nlet entra = temChave && portaAberta;`,
    options: ['true', 'false', 'undefined', '1'],
    correctIndex: 1,
    explanation:
      'O operador "&&" (E lógico) só retorna true se TODAS as condições forem verdadeiras. Como uma delas é false, o resultado é false.',
  },
  {
    id: 'op-2',
    topic: 'operadores',
    topicLabel: 'Operadores Lógicos',
    prompt: 'Qual será o valor da variável "acesso" usando o operador || (OU)?',
    code: `let vip = false;\nlet convite = true;\nlet acesso = vip || convite;`,
    options: ['true', 'false', 'null', '0'],
    correctIndex: 0,
    explanation:
      'O operador "||" (OU lógico) retorna true se PELO MENOS UMA das condições for verdadeira. Como "convite" é true, acesso é true.',
  },
  {
    id: 'op-3',
    topic: 'operadores',
    topicLabel: 'Operadores Lógicos',
    prompt: 'O que faz o operador "!" antes da variável no código abaixo?',
    code: `let ativo = true;\nlet resultado = !ativo;`,
    options: [
      'Mantém o valor como true',
      'Inverte o valor lógico para false',
      'Transforma true em texto',
      'Gera um erro de sintaxe',
    ],
    correctIndex: 1,
    explanation:
      'O operador "!" é a negação lógica (NÃO): ele inverte valores booleanos, transformando true em false e vice-versa.',
  },
  {
    id: 'op-4',
    topic: 'operadores',
    topicLabel: 'Operadores Lógicos',
    prompt: 'Avalie a expressão combinada abaixo. Qual será o valor de "ok"?',
    code: `let a = 10;\nlet b = 5;\nlet ok = (a > 8) && (b < 3 || a === 10);`,
    options: ['true', 'false', '10', '5'],
    correctIndex: 0,
    explanation:
      '(10 > 8) é true. Dentro do segundo parêntese, (5 < 3) é false, mas (10 === 10) é true, logo false || true = true. Por fim, true && true = true.',
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Seleciona 10 perguntas equilibradas para uma partida, garantindo
 * pelo menos 1 pergunta de cada um dos 7 tópicos essenciais.
 */
export function selectMatchQuestions(count = 10): Question[] {
  const topics: TopicId[] = [
    'variaveis',
    'if',
    'else',
    'for',
    'while',
    'arrays',
    'operadores',
  ];

  const selected: Question[] = [];
  const usedIds = new Set<string>();

  // 1 pergunta garantida de cada tópico
  for (const topic of topics) {
    const pool = shuffleArray(QUESTION_BANK.filter((q) => q.topic === topic));
    if (pool.length > 0) {
      selected.push(pool[0]);
      usedIds.add(pool[0].id);
    }
  }

  // Completa até 10 perguntas com o restante do banco embaralhado
  const remaining = shuffleArray(QUESTION_BANK.filter((q) => !usedIds.has(q.id)));
  for (const q of remaining) {
    if (selected.length >= count) break;
    selected.push(q);
  }

  return shuffleArray(selected);
}
