import { AssessmentProfile } from '../../types/careers';

export interface ServerQuestion {
  id: string;
  assessment_profile: AssessmentProfile;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  question: string;
  options: string[];
  correct_answer: number; // 0-indexed option
  explanation: string;
  skills: string[];
}

export const QUESTION_BANK: ServerQuestion[] = [
  // ==========================================
  // AI_ENGINEERING
  // ==========================================
  {
    id: 'ai-eng-1',
    assessment_profile: 'AI_ENGINEERING',
    difficulty: 'EASY',
    question: 'Em arquiteturas RAG (Retrieval-Augmented Generation), qual o papel fundamental da etapa de re-ranking pós-recuperação vetorial?',
    options: [
      'Substituir o modelo de embedding por um classificador booleano.',
      'Reordenar os chunks recuperados com cross-encoders para maximizar a relevância semântica antes de alimentar o contexto do LLM.',
      'Comprimir os embeddings vetoriais para formato FP8 e reduzir latência de I/O.',
      'Eliminar a necessidade de armazenar índices vetoriais em banco relacional.'
    ],
    correct_answer: 1,
    explanation: 'Cross-encoders na etapa de re-ranking avaliam o par (query, chunk) conjuntamente, capturando relações semânticas finas que embeddings densos bi-encoder perdem na busca inicial.',
    skills: ['RAG Architecture', 'Cross-Encoders', 'Information Retrieval']
  },
  {
    id: 'ai-eng-2',
    assessment_profile: 'AI_ENGINEERING',
    difficulty: 'EASY',
    question: 'Qual métrica é mais apropriada para mitigar alucinações factuais em saídas de modelos generativos estruturados?',
    options: [
      'Perplexidade pura calculada no corpus de treinamento.',
      'F1-Score e Recall de Entidades Nomeadas com verificação cruzada em grafo de conhecimento (KG Faithfulness).',
      'BLEU-4 score sem penalidade de brevidade.',
      'Cosine similarity entre os vetores de input e output token-a-token.'
    ],
    correct_answer: 1,
    explanation: 'A fidelidade a grafos de conhecimento (Knowledge Graph Faithfulness) e verificação de fatos/triplas atômicas medem com exatidão se as entidades geradas são fundamentadas em fontes verificadas.',
    skills: ['Model Evaluation', 'Hallucination Mitigation', 'Knowledge Graphs']
  },
  {
    id: 'ai-eng-3',
    assessment_profile: 'AI_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Ao projetar um sistema de agentes autônomos para orquestração de análises industriais, qual padrão mitiga loops infinitos e degradação de contexto?',
    options: [
      'Execução sem timeout com greedy decoding e temperatura 1.0.',
      'Arquitetura ReAct com State Machine determinística, limites explícitos de iteração, guardrails e checkpointing de memória transacional.',
      'Encadear prompts estáticos em série sem validação de schemas intermediários.',
      'Executar todas as ferramentas em paralelo descartando o feedback de erro da chamada de ferramenta.'
    ],
    correct_answer: 1,
    explanation: 'State machines determinísticas (como LangGraph/FSM) com guardrails e contadores de passos evitam divergência e loops de raciocínio não-convergentes.',
    skills: ['AI Agents', 'ReAct Pattern', 'Deterministic FSM']
  },
  {
    id: 'ai-eng-4',
    assessment_profile: 'AI_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Na otimização de inferência de LLMs em GPUs corporativas, qual técnica preserva precisão numérica enquanto reduz a banda de memória do KV Cache?',
    options: [
      'Quantização PagedAttention com FP8/INT8 KV Cache e FlashAttention-2/3.',
      'Truncamento arbitrário dos primeiros tokens do prompt de sistema.',
      'Substituição de matrizes de atenção por camadas densas lineares sem pesos.',
      'Aumento do batch size acima da capacidade VRAM com swap em disco SATA.'
    ],
    correct_answer: 0,
    explanation: 'PagedAttention com quantização do KV Cache e kernels FlashAttention reduzem dramaticamente o footprint de memória sem alterar a matemática da auto-atenção.',
    skills: ['Inference Optimization', 'PagedAttention', 'FlashAttention']
  },
  {
    id: 'ai-eng-5',
    assessment_profile: 'AI_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Ao integrar Function Calling com APIs críticas de telemetria industrial, como garantir que parâmetros fora do domínio seguro sejam rejeitados antes da execução física?',
    options: [
      'Confiar cegamente na string JSON retornada pelo modelo.',
      'Aplicar validação rigorosa de schemas com tipagem estrita (e.g. Zod/Pydantic), range checks matemáticos e dupla confirmação criptográfica.',
      'Executar o payload diretamente no controlador lógico programável (PLC).',
      'Desativar o modo de chamada estruturada e fazer parsing regex manual.'
    ],
    correct_answer: 1,
    explanation: 'Sistemas industriais exigem validação determinística de limites operacionais antes de qualquer chamada a atuadores ou PLCs físicos.',
    skills: ['Function Calling', 'Schema Validation', 'Industrial Guardrails']
  },
  {
    id: 'ai-eng-6',
    assessment_profile: 'AI_ENGINEERING',
    difficulty: 'HARD',
    question: 'Em um pipeline distribuído de fine-tuning PEFT (LoRA/QLoRA), como mitigar o esquecimento catastrófico (catastrophic forgetting) em tarefas especializadas de engenharia?',
    options: [
      'Congelar todos os pesos e aplicar fine-tuning apenas no tokenizer.',
      'Combinar regularização com dataset replay balanceado de conhecimento geral, rank adapter adaptativo e taxa de aprendizado com warmup e decay conservador.',
      'Treinar com taxa de aprendizado 10x superior nos adaptadores.',
      'Aplicar pruning de 90% das camadas de feed-forward da rede base.'
    ],
    correct_answer: 1,
    explanation: 'O uso de dataset de replay do domínio geral misturado ao domínio especializado previne o colapso de capacidades cognitivas fundamentais do modelo base.',
    skills: ['Fine-Tuning', 'PEFT/LoRA', 'Catastrophic Forgetting Mitigation']
  },

  // ==========================================
  // GEN_AI
  // ==========================================
  {
    id: 'gen-ai-1',
    assessment_profile: 'GEN_AI',
    difficulty: 'EASY',
    question: 'No paradigma de Prompt Engineering, qual a principal vantagem do padrão "Chain-of-Thought" (CoT) com Few-Shot exemplar?',
    options: [
      'Reduzir o consumo de tokens na janela de contexto a zero.',
      'Induzir o modelo a explicitar raciocínios intermediários estruturados antes de emitir a resposta final, elevando a precisão lógica.',
      'Forçar o modelo a rodar código nativo em assembly no servidor.',
      'Impedir que o modelo acesse a internet durante a inferência.'
    ],
    correct_answer: 1,
    explanation: 'Chain-of-Thought condiciona a geração autoregressiva a passar por etapas de raciocínio simbólico passo a passo antes da conclusão.',
    skills: ['Prompt Engineering', 'Chain-of-Thought', 'Few-Shot Reasoning']
  },
  {
    id: 'gen-ai-2',
    assessment_profile: 'GEN_AI',
    difficulty: 'EASY',
    question: 'O que define um ataque de "Prompt Injection Indireto" em sistemas corporativos que processam documentos externos?',
    options: [
      'Queda de energia no datacenter hospedeiro da GPU.',
      'Instruções maliciosas embutidas em fontes de dados lidas pelo modelo (e.g. PDFs, e-mails, páginas web) que sequestram a lógica de execução.',
      'Injeção de comandos SQL no banco relacional via endpoint JDBC.',
      'Envio de prompts em línguas não suportadas pelo vocabulário do tokenizer.'
    ],
    correct_answer: 1,
    explanation: 'Prompt Injection Indireto ocorre quando dados não-confiáveis processados pelo LLM contêm diretivas que subvertem a instrução de sistema.',
    skills: ['AI Security', 'Prompt Injection', 'Data Sanitization']
  },
  {
    id: 'gen-ai-3',
    assessment_profile: 'GEN_AI',
    difficulty: 'MEDIUM',
    question: 'Qual a estratégia recomendada para garantir saídas em formato JSON 100% válido a partir de LLMs em produção?',
    options: [
      'Adicionar "retorne em JSON" no prompt e torcer para não haver quebras.',
      'Utilizar gramáticas livres de contexto guiadas (Guided Decoding / JSON Schema Enforcement via Logit Bias) nativas da engine de inferência.',
      'Remover todas as aspas do prompt do usuário.',
      'Executar o modelo com temperatura 2.0 para maior diversidade sintática.'
    ],
    correct_answer: 1,
    explanation: 'Guided Decoding (constrained sampling) mascara logits a cada token para permitir apenas caracteres que cumprem formalmente a gramática do schema.',
    skills: ['Structured Outputs', 'Constrained Sampling', 'JSON Schema']
  },
  {
    id: 'gen-ai-4',
    assessment_profile: 'GEN_AI',
    difficulty: 'MEDIUM',
    question: 'Em sistemas multimodais que processam ortofotos de satélite e diagramas CAD, qual o formato de tokenização de imagem mais comum nos modelos de visão contemporâneos?',
    options: [
      'Conversão da imagem em bitmap puro ASCII de 1-bit.',
      'Divisão da imagem em patches espaciais processados por Vision Transformers (ViT) e projetados no espaço de embeddings do LLM.',
      'Transformada de Fourier 1D aplicada na primeira linha de pixels.',
      'Compressão JPEG com perda de 95% antes do encoder.'
    ],
    correct_answer: 1,
    explanation: 'Vision Transformers segmentam imagens em patches 2D (ex: 14x14 pixels) convertidos em sequências de tokens via projeção linear.',
    skills: ['Multimodal AI', 'Vision Transformers', 'Remote Sensing Vision']
  },
  {
    id: 'gen-ai-5',
    assessment_profile: 'GEN_AI',
    difficulty: 'MEDIUM',
    question: 'Ao calibrar a temperatura e top-p para geração de laudos técnicos de engenharia e conformidade jurídica, qual a configuração indicada?',
    options: [
      'Temperatura = 1.8 e top-p = 1.0 para criatividade literária.',
      'Temperatura baixa (0.0 a 0.2) e top-p restrito (0.85 a 0.95) para máxima determinabilidade e consistência factual.',
      'Temperatura negativa para forçar inversão de polaridade dos pesos.',
      'Desativar o decoder e gerar saídas estocásticas puras.'
    ],
    correct_answer: 1,
    explanation: 'Laudos técnicos e de conformidade requerem previsibilidade e aderência estrita aos fatos, minimizando amostragem estocástica.',
    skills: ['Decoding Parameters', 'Engineering Compliance', 'Sampling Control']
  },
  {
    id: 'gen-ai-6',
    assessment_profile: 'GEN_AI',
    difficulty: 'HARD',
    question: 'Como estruturar uma avaliação automatizada contínua (LLM-as-a-Judge) sem introduzir viés de auto-preferência ou viés posicional?',
    options: [
      'Avaliar apenas 1 candidato e aceitar notas de 1 a 10 sem critérios rubrica.',
      'Empregar rubricas analíticas atomizadas, cegamento de identidade do modelo, alternância posicional dos pares de avaliação e calibração contra benchmarks humanos.',
      'Usar o mesmo modelo sob teste para se auto-avaliar sem prompts contrastivos.',
      'Descartar métricas semânticas e monitorar apenas contagem de caracteres.'
    ],
    correct_answer: 1,
    explanation: 'Mitigar position bias e verbosity bias em LLM-as-a-Judge requer permutação de ordem, critérios rubrica detalhados e calibração empírica.',
    skills: ['LLM-as-a-Judge', 'Bias Mitigation', 'Automated QA Evaluation']
  },

  // ==========================================
  // DATA
  // ==========================================
  {
    id: 'data-1',
    assessment_profile: 'DATA',
    difficulty: 'EASY',
    question: 'Qual a diferença crucial entre abordagens ETL tradicional e ELT moderno em datalakes corporativos?',
    options: [
      'No ELT os dados nunca sofrem transformação em nenhuma fase.',
      'No ELT a carga de dados brutos ocorre diretamente no data lake/warehouse, aproveitando o poder de processamento distribuído da nuvem para transformação posterior.',
      'O ETL é executado exclusivamente na memória de smartphones.',
      'O ELT elimina a necessidade de definir schemas ou catálogos de metadados.'
    ],
    correct_answer: 1,
    explanation: 'ELT permite ingestão ultrarrápida de dados não-processados preservando o estado bruto (Bronze layer) antes de transformações pesadas.',
    skills: ['ELT / ETL', 'Data Lakehouse', 'Distributed Data Processing']
  },
  {
    id: 'data-2',
    assessment_profile: 'DATA',
    difficulty: 'EASY',
    question: 'Em modelagem dimensional Star Schema, qual a função primária das tabelas de dimensões conectadas a uma tabela de fatos?',
    options: [
      'Armazenar chaves criptográficas de segurança.',
      'Fornecer o contexto contextual de negócio (quem, onde, quando, o quê) para agregação e filtragem das métricas quantitativas da fato.',
      'Substituir o storage em bloco por memória cache volátil.',
      'Eliminar a normalização de dados operacionais relacionais.'
    ],
    correct_answer: 1,
    explanation: 'Tabelas de dimensões contêm atributos descritivos que permitem fatiamento (slice & dice) das métricas de negócio registradas na tabela fato.',
    skills: ['Dimensional Modeling', 'Star Schema', 'Business Analytics']
  },
  {
    id: 'data-3',
    assessment_profile: 'DATA',
    difficulty: 'MEDIUM',
    question: 'Na arquitetura Medallion (Bronze -> Silver -> Gold), qual critério define a transição de um dataset da camada Bronze para a Silver?',
    options: [
      'Conversão obrigatória para imagens PNG.',
      'Limpeza, desduplicação, validação de schema, enriquecimento semântico e conformidade com tipos canônicos.',
      'Agregação em relatórios finais de diretoria em formato PDF.',
      'Eliminação permanente do timestamp de ingestão original.'
    ],
    correct_answer: 1,
    explanation: 'A camada Silver representa dados limpos, conformados e prontos para cruzamento corporativo após tratamento de inconsistências.',
    skills: ['Medallion Architecture', 'Data Quality', 'Schema Enforcement']
  },
  {
    id: 'data-4',
    assessment_profile: 'DATA',
    difficulty: 'MEDIUM',
    question: 'Ao modelar redes complexas de sensores ambientais e cadeias de suprimentos de mineração, qual a vantagem de um banco de grafos (ex: Neo4j) sobre bancos relacionais?',
    options: [
      'Grafos são mais lentos para consultas de relacionamentos profundos.',
      'Bancos de grafos utilizam index-free adjacency, executando travessias de k-saltos em tempo linear em relação ao subgrafo sem explosão de JOINs relacionais.',
      'Grafos não permitem consultas com atributos numéricos.',
      'Grafos descartam qualquer necessidade de modelagem estrutural.'
    ],
    correct_answer: 1,
    explanation: 'Index-free adjacency permite navegar relacionamentos diretamente por ponteiros em memória sem custo combinatorial de múltiplos JOINs SQL.',
    skills: ['Graph Databases', 'Neo4j / Cypher', 'Complex Network Topologies']
  },
  {
    id: 'data-5',
    assessment_profile: 'DATA',
    difficulty: 'MEDIUM',
    question: 'Como assegurar idempotência em pipelines de streaming de telemetria contínua com Apache Kafka e Apache Flink?',
    options: [
      'Processar dados apenas em lote uma vez por mês.',
      'Empregar semântica exactly-once (EOS) com checkpoints de estado consistentes, transações two-phase commit e chaves determinísticas de desduplicação.',
      'Desativar os acks dos producers Kafka para máxima vazão.',
      'Ignorar timestamps de eventos e usar apenas relógio do processador consumidor.'
    ],
    correct_answer: 1,
    explanation: 'Idempotência em streaming exige semântica exactly-once ponta a ponta com two-phase commits e identificadores determinísticos de transação.',
    skills: ['Streaming Systems', 'Kafka / Flink', 'Exactly-Once Semantics']
  },
  {
    id: 'data-6',
    assessment_profile: 'DATA',
    difficulty: 'HARD',
    question: 'Em governança de dados e auditoria regulatória, qual mecanismo garante rastreabilidade total (Data Lineage) e detecção de drift estatístico em produção?',
    options: [
      'Anotação manual em planilhas sem versionamento.',
      'Catálogo automatizado de metadados baseado no padrão OpenLineage integrado a testes de contrato de dados e ferramentas de observabilidade (Great Expectations / Monte Carlo).',
      'Despejo de logs brutos em bucket S3 sem política de retenção.',
      'Bloqueio completo de qualquer alteração de schema nos sistemas fontes.'
    ],
    correct_answer: 1,
    explanation: 'OpenLineage acoplado a observabilidade estatística rastreia a genealogia exata de cada transformação e detecta anomalias de distribuição.',
    skills: ['Data Lineage', 'OpenLineage', 'Data Drift & Observability']
  },

  // ==========================================
  // CYBERSECURITY
  // ==========================================
  {
    id: 'sec-1',
    assessment_profile: 'CYBERSECURITY',
    difficulty: 'EASY',
    question: 'Em redes de Tecnologia Operacional (OT/ICS) industriais, qual modelo arquitetural segmenta redes de automação de redes corporativas (IT)?',
    options: [
      'Modelo OSI com todas as camadas em uma única VLAN plana.',
      'Modelo Purdue (ISA-95 / IEC 62443), dividindo níveis desde instrumentação física (Nível 0) até TI corporativa (Nível 4/5) com DMZ industrial.',
      'Topologia de anel simples sem firewalls perimetrais.',
      'Conexão direta de PLCs à internet pública via IP estático.'
    ],
    correct_answer: 1,
    explanation: 'O Modelo Purdue estabelece zonas e conduítes formais que impedem ameaças da rede corporativa de trafegarem para os níveis de controle de processo.',
    skills: ['ISA/IEC 62443', 'Purdue Model', 'Industrial OT Security']
  },
  {
    id: 'sec-2',
    assessment_profile: 'CYBERSECURITY',
    difficulty: 'EASY',
    question: 'Qual o pilar central do modelo de segurança Zero Trust aplicado a infraestruturas críticas de engenharia?',
    options: [
      'Confiar em qualquer dispositivo conectado por cabo físico.',
      '"Nunca confiar, sempre verificar": autenticação e autorização explícitas e contínuas baseadas em contexto, menor privilégio e criptografia ponta a ponta.',
      'Usar senhas com no mínimo 6 dígitos sem expiração.',
      'Permitir acesso irrestrito para administradores que estejam no mesmo IP da empresa.'
    ],
    correct_answer: 1,
    explanation: 'Zero Trust assume que a rede interna pode estar comprometida, exigindo verificação contínua de identidade, postura do dispositivo e acesso mínimo necessário.',
    skills: ['Zero Trust Architecture', 'Continuous Verification', 'Least Privilege']
  },
  {
    id: 'sec-3',
    assessment_profile: 'CYBERSECURITY',
    difficulty: 'MEDIUM',
    question: 'Em protocolos legados industriais como Modbus TCP ou DNP3 desprovidos de criptografia nativa, como mitigar ataques de Man-in-the-Middle e injeção de comandos?',
    options: [
      'Alterar a porta padrão do protocolo para outra porta arbitrária.',
      'Implementar túneis IPSec/WireGuard com inspeção profunda de pacotes (DPI) e detecção de anomalias com firewalls industriais específicos para protocolo ICS.',
      'Desativar todos os alertas de rede para evitar falsos positivos.',
      'Conectar os sensores via Wi-Fi desprotegido para facilitar a manutenção.'
    ],
    correct_answer: 1,
    explanation: 'Inspeção profunda de pacotes (DPI) valida a conformidade dos comandos Modbus em relação às regras de segurança além de túneis criptográficos dedicados.',
    skills: ['Industrial Protocols', 'Modbus / DNP3', 'Deep Packet Inspection']
  },
  {
    id: 'sec-4',
    assessment_profile: 'CYBERSECURITY',
    difficulty: 'MEDIUM',
    question: 'Ao lidar com um incidente de segurança em um sistema SCADA que controla uma barragem ou subestação, qual é a prioridade suprema?',
    options: [
      'Preservar logs forenses mesmo que isso implique desarmar os freios de emergência.',
      'Segurança física de vidas humanas e integridade física dos ativos (Safety & Integrity) antes de confidencialidade de dados.',
      'Formatar imediatamente todos os servidores de supervisão para evitar vazamentos.',
      'Desconectar a alimentação elétrica de toda a usina de forma intempestiva.'
    ],
    correct_answer: 1,
    explanation: 'Em sistemas ciberfísicos (OT), o princípio Safety (segurança da vida e dos ativos operacionais) prevalece sobre disponibilidade e confidencialidade convencionais.',
    skills: ['Incident Response', 'OT Safety Priorities', 'Critical Infrastructure']
  },
  {
    id: 'sec-5',
    assessment_profile: 'CYBERSECURITY',
    difficulty: 'MEDIUM',
    question: 'Qual a técnica de mitigação eficaz contra ataques de Supply Chain em dependências de software (ex: npm, PyPI)?',
    options: [
      'Fazer download automático de versões "latest" sem verificar checksum.',
      'Uso de SBOM (Software Bill of Materials), lockfiles imutáveis, pinagem criptográfica de hashes e verificação contínua de CVEs em pipelines CI/CD com attestation SLSA.',
      'Apagar o código-fonte após compilar para evitar auditorias externas.',
      'Desativar o escaneamento de vulnerabilidades no build server.'
    ],
    correct_answer: 1,
    explanation: 'SBOMs com verificação criptográfica de integridade de dependências e conformidade SLSA impedem a injeção de bibliotecas comprometidas em builds.',
    skills: ['Supply Chain Security', 'SBOM', 'SLSA Framework']
  },
  {
    id: 'sec-6',
    assessment_profile: 'CYBERSECURITY',
    difficulty: 'HARD',
    question: 'Como arquitetar isolamento seguro de credenciais em ambientes Kubernetes industriais sem expor chaves estáticas em containers?',
    options: [
      'Escrever tokens de API no arquivo Dockerfile em texto plano.',
      'Utilizar Workload Identity Federation / SPIFFE-SPIRE integrado a cofres de segredos (HashiCorp Vault) com rotação automática de tokens efêmeros de curto ciclo de vida.',
      'Compartilhar a mesma chave SSH raiz entre todos os pods do cluster.',
      'Gravar credenciais em variáveis de ambiente globais públicas.'
    ],
    correct_answer: 1,
    explanation: 'Identidades criptográficas de carga de trabalho (SPIFFE/Vault) fornecem credenciais temporárias de curto tempo sem segredos estáticos persistidos em imagem.',
    skills: ['Secrets Management', 'SPIFFE / Vault', 'Cloud Native Security']
  },

  // ==========================================
  // EMBEDDED
  // ==========================================
  {
    id: 'emb-1',
    assessment_profile: 'EMBEDDED',
    difficulty: 'EASY',
    question: 'Qual barramento de comunicação serial é mais resistente a interferências eletromagnéticas (EMI) em longas distâncias industriais?',
    options: [
      'I2C com resistores de pull-up de 10k.',
      'RS-485 com sinalização diferencial balanceada em par trançado.',
      'SPI de 4 fios em cabo paralelo simples sem blindagem.',
      'UART TTL de 3.3V desbalanceado.'
    ],
    correct_answer: 1,
    explanation: 'A sinalização diferencial do RS-485 rejeita ruído de modo comum, permitindo transmissões confiáveis a até 1200 metros em ambientes com alto ruído eletromagnético.',
    skills: ['Industrial Buses', 'RS-485', 'Noise Immunity']
  },
  {
    id: 'emb-2',
    assessment_profile: 'EMBEDDED',
    difficulty: 'EASY',
    question: 'Em sistemas embarcados com RTOS (Real-Time Operating System), o que caracteriza um sistema de "Hard Real-Time"?',
    options: [
      'O processador opera com clock superior a 4 GHz.',
      'A perda de um deadline temporal de execução resulta em falha catastrófica total do sistema.',
      'O código é obrigatoriamente escrito em Python puro.',
      'O sistema reinicia a cada 10 minutos para liberar memória RAM.'
    ],
    correct_answer: 1,
    explanation: 'Em Hard Real-Time, o determinismo temporal é rigoroso: uma resposta correta entregue após o deadline temporal é considerada uma falha do sistema.',
    skills: ['RTOS', 'Hard Real-Time', 'Deterministic Scheduling']
  },
  {
    id: 'emb-3',
    assessment_profile: 'EMBEDDED',
    difficulty: 'MEDIUM',
    question: 'Qual o mecanismo de proteção contra travamento infinito de microcontroladores em nós de sensoriamento remoto de campo?',
    options: [
      'Desativar todas as interrupções de hardware.',
      'Watchdog Timer (WDT) com recarga periódica de janela (Windowed WDT) alimentado por oscilador de clock independente.',
      'Aumentar indefinidamente a capacidade do capacitor de desacoplamento.',
      'Colocar o processador em modo sleep permanente após a primeira leitura.'
    ],
    correct_answer: 1,
    explanation: 'O Watchdog Timer monitora a execução regular do firmware e aciona um reset controlado de hardware caso o código trave em loops anômalos.',
    skills: ['Watchdog Timer', 'Fault Recovery', 'Field Reliability']
  },
  {
    id: 'emb-4',
    assessment_profile: 'EMBEDDED',
    difficulty: 'MEDIUM',
    question: 'Em telemetria ambiental ultra-low-power movida a energia solar e supercapacitores, qual técnica de firmware maximiza a vida útil?',
    options: [
      'Manter o rádio transmissor ligado ininterruptamente aguardando comandos.',
      'Deep Sleep com duty cycling agressivo, acionamento periódico via RTC e envio de dados agregados com compressão delta.',
      'Executar polling contínuo sem interrupções de hardware.',
      'Utilizar processadores x86 de servidor sem gerenciamento de clock.'
    ],
    correct_answer: 1,
    explanation: 'Duty cycling com Deep Sleep reduz o consumo para microamperes, ativando periféricos e rádio apenas durante a janela estrita de leitura e transmissão.',
    skills: ['Ultra-Low Power', 'Deep Sleep', 'Energy Harvesting']
  },
  {
    id: 'emb-5',
    assessment_profile: 'EMBEDDED',
    difficulty: 'MEDIUM',
    question: 'Ao implementar atualização remota de firmware (FOTA) em campo via rede celular ou satélite, como evitar que o dispositivo "briquetize" em caso de falha de conexão?',
    options: [
      'Sobrescrever diretamente o setor de boot primário sem fazer backup da versão anterior.',
      'Arquitetura Dual-Bank Flash (A/B partitioning) com verificação de assinatura criptográfica e rollback automático para a partição estável se o boot de teste falhar.',
      'Reiniciar o microcontrolador no meio da gravação de memória.',
      'Transmitir o binário sem checksum de integridade (CRC32/SHA256).'
    ],
    correct_answer: 1,
    explanation: 'Dual-Bank Flash com verificação criptográfica garante que a versão antiga permaneça intacta até que a nova imagem passe nos autotestes pós-boot.',
    skills: ['FOTA Updates', 'Dual-Bank Flash', 'Safe Rollback']
  },
  {
    id: 'emb-6',
    assessment_profile: 'EMBEDDED',
    difficulty: 'HARD',
    question: 'Em sistemas embarcados de controle industrial crítico, o que é o fenômeno de "Inversão de Prioridade" e como o protocolo Priority Inheritance o resolve?',
    options: [
      'Inversão de polaridade na bateria de lítio resolvida por diodos Schottky.',
      'Uma tarefa de baixa prioridade retém um recurso compartilhado impedindo uma de alta prioridade; o protocolo eleva temporariamente a prioridade da tarefa baixa ao nível da tarefa que aguarda o recurso.',
      'Alternância entre ordem de bytes big-endian e little-endian corrigida por hardware.',
      'Troca de pinos analógicos por digitais durante a compilação cruzada.'
    ],
    correct_answer: 1,
    explanation: 'Priority Inheritance eleva a prioridade da tarefa detentora do mutex para a maior prioridade entre as tarefas bloqueadas por ele, prevenindo bloqueio indefinido.',
    skills: ['Priority Inversion', 'RTOS Mutexes', 'Priority Inheritance']
  },

  // ==========================================
  // EDGE_AI
  // ==========================================
  {
    id: 'edge-1',
    assessment_profile: 'EDGE_AI',
    difficulty: 'EASY',
    question: 'Qual a principal motivação para executar inferência de visão computacional na borda (Edge AI) em vez de enviar todos os vídeos brutos para a nuvem?',
    options: [
      'Aumentar o custo de servidores em data centers distantes.',
      'Reduzir latência de resposta para milissegundos, economizar largura de banda de uplink de satélite/4G e garantir operação contínua mesmo sem internet.',
      'Impedir que câmeras industriais usem lentes ópticas de precisão.',
      'Garantir que os modelos de IA nunca sofram atualizações de pesos.'
    ],
    correct_answer: 1,
    explanation: 'A inferência local na borda elimina dependência de links de telecomunicação instáveis e viabiliza resposta em tempo real para automação.',
    skills: ['Edge Computing', 'Bandwidth Optimization', 'Offline Resilience']
  },
  {
    id: 'edge-2',
    assessment_profile: 'EDGE_AI',
    difficulty: 'EASY',
    question: 'Qual técnica de otimização converte pesos de modelos FP32 (32-bit floating point) para INT8 (8-bit integer) com mínima perda de precisão em aceleradores Edge?',
    options: [
      'Quantização pós-treinamento (Post-Training Quantization - PTQ) calibrada com dataset representativo.',
      'Eliminação aleatória de metades das matrizes de convolução.',
      'Multiplicação de todos os pesos por zero.',
      'Conversão do modelo para arquivo de áudio WAV.'
    ],
    correct_answer: 0,
    explanation: 'A quantização mapeia tensores contínuos em inteiros discretos de 8 bits, acelerando a taxa de processamento em NPUs e economizando memória.',
    skills: ['Model Quantization', 'INT8 Inference', 'NPU Acceleration']
  },
  {
    id: 'edge-3',
    assessment_profile: 'EDGE_AI',
    difficulty: 'MEDIUM',
    question: 'Em plataformas NVIDIA Jetson ou Hailo NPU, qual pipeline de aceleração é comumente empregado para orquestrar decodificação de vídeo de hardware e inferência de redes neurais?',
    options: [
      'GStreamer / DeepStream SDK integrado com TensorRT.',
      'Script bash simples com chamadas ffmpeg via CPU em loop contínuo.',
      'Renderização de frames em Canvas HTML via navegador web.',
      'Gravação em fita magnética antes de qualquer inferência.'
    ],
    correct_answer: 0,
    explanation: 'NVIDIA DeepStream com TensorRT fornece aceleração de hardware ponta a ponta: da decodificação H.264/H.265 via NVDEC à inferência direta na memória VRAM.',
    skills: ['NVIDIA Jetson', 'DeepStream', 'TensorRT Pipelines']
  },
  {
    id: 'edge-4',
    assessment_profile: 'EDGE_AI',
    difficulty: 'MEDIUM',
    question: 'Como lidar com o superaquecimento (Thermal Throttling) de dispositivos Edge AI instalados em gabinetes estanques IP67 sob sol pleno no semiárido?',
    options: [
      'Instalar ventiladores abertos sem filtro que suguem poeira mineral para dentro.',
      'Projeto térmico passivo com dissipação para carcaça de alumínio anodizado aletada, condutores térmicos e monitoramento de governor de frequência via firmware.',
      'Desligar os sensores de temperatura do processador.',
      'Manter a NPU em 100% de clock constante independentemente da temperatura.'
    ],
    correct_answer: 1,
    explanation: 'Dispositivos industriais utilizam carcaças aletadas de alumínio com dissipação passiva condutiva, evitando entradas de ar que violariam a vedação IP67.',
    skills: ['Industrial Thermal Management', 'IP67 Enclosures', 'Governor Control']
  },
  {
    id: 'edge-5',
    assessment_profile: 'EDGE_AI',
    difficulty: 'MEDIUM',
    question: 'Em aplicações de bioacústica para monitoramento de fauna na Amazônia, qual representação de sinal de áudio é mais eficaz como entrada para redes convolucionais 2D?',
    options: [
      'Arquivo de texto com a letra das músicas dos pássaros.',
      'Espectrogramas Mel ou Mel-Frequency Cepstral Coefficients (MFCCs) normalizados no domínio tempo-frequência.',
      'Sinal binário puro de 1 bit sem amostragem.',
      'Contagem de picos de volume absoluto sem análise espectral.'
    ],
    correct_answer: 1,
    explanation: 'Espectrogramas Mel convertem áudio em matrizes 2D de intensidade espectral ao longo do tempo, adequadas para convoluções de visão computacional.',
    skills: ['Bioacoustics AI', 'Mel Spectrograms', 'Signal Processing']
  },
  {
    id: 'edge-6',
    assessment_profile: 'EDGE_AI',
    difficulty: 'HARD',
    question: 'Em um sistema de Edge AI para detecção precoce de anomalias em correias transportadoras de mineração, como evitar falso-positivo em partidas de motor com alta vibração transitória?',
    options: [
      'Desativar todos os sensores de vibração durante a operação inteira.',
      'Implementar filtragem adaptativa com sincronização de estados de processo (telemetria do inversor de frequência/VFD) e janelas temporais de supressão parametrizadas.',
      'Disparar o alarme geral de evacuação da mina toda vez que a esteira ligar.',
      'Ignorar vibrações acima de 100 Hz.'
    ],
    correct_answer: 1,
    explanation: 'A correlação entre o estado de comando do inversor de frequência e a janela transitória de aceleração evita que o pico de torque inicial seja classificado como falha mecânica.',
    skills: ['Edge Anomaly Detection', 'Sensor Fusion', 'Industrial Condition Monitoring']
  },

  // ==========================================
  // ENVIRONMENTAL_ENGINEERING
  // ==========================================
  {
    id: 'env-1',
    assessment_profile: 'ENVIRONMENTAL_ENGINEERING',
    difficulty: 'EASY',
    question: 'No processo de licenciamento ambiental trifásico brasileiro (Lei nº 6.938/1981), qual a sequência legal correta das licenças?',
    options: [
      'Licença de Operação (LO) -> Licença de Instalação (LI) -> Licença Prévia (LP).',
      'Licença Prévia (LP) -> Licença de Instalação (LI) -> Licença de Operação (LO).',
      'Licença Definitiva (LD) -> Licença Temporária (LT).',
      'Autorização Única de Obras sem etapas prévias.'
    ],
    correct_answer: 1,
    explanation: 'O rito ordinário segue LP (viabilidade locacional e ambiental), LI (aprovação dos projetos executivos e planos de controle) e LO (início legal das atividades após verificação do cumprimento das condicionantes).',
    skills: ['Environmental Licensing', 'LP / LI / LO', 'Brazilian Environmental Law']
  },
  {
    id: 'env-2',
    assessment_profile: 'ENVIRONMENTAL_ENGINEERING',
    difficulty: 'EASY',
    question: 'Qual parâmetro limnológico é indispensável para diagnosticar processos de eutrofização antropogênica em reservatórios hídricos industriais?',
    options: [
      'Índice de refração da luz solar pura.',
      'Concentração de fósforo total, nitrogênio total, oxigênio dissolvido (OD) e clorofila-a.',
      'Teor de ouro dissolvido por litro de efluente.',
      'Resistência à tração das moléculas de água.'
    ],
    correct_answer: 1,
    explanation: 'A eutrofização decorre do aporte excessivo de nutrientes (fósforo e nitrogênio), provocando floração de algas (clorofila-a) e consumo de oxigênio dissolvido na decomposição.',
    skills: ['Water Quality', 'Limnology', 'Eutrophication Indicators']
  },
  {
    id: 'env-3',
    assessment_profile: 'ENVIRONMENTAL_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Em um Plano de Recuperação de Áreas Degradadas (PRAD) para solos degradados com voçorocamento severo, qual a primeira intervenção física mandatória?',
    options: [
      'Plantio imediato de grama sem qualquer conformação do terreno.',
      'Controle hidrológico de escoamento superficial (dissipadores de energia, canais divergentes), retaludamento mecânico e estabilização de fundo com paliçadas ou biomantas.',
      'Inundação da voçoroca com esgoto sanitário bruto.',
      'Aplicação de asfalto sobre toda a área erodida.'
    ],
    correct_answer: 1,
    explanation: 'Antes da recomposição florística, é indispensável cessar a energia hidráulica da água de enxurrada e estabilizar a geometria das encostas.',
    skills: ['PRAD Restoration', 'Soil Conservation', 'Gully Erosion Control']
  },
  {
    id: 'env-4',
    assessment_profile: 'ENVIRONMENTAL_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'De acordo com a Resolução CONAMA nº 430/2011, qual a diretriz fundamental para lançamento de efluentes tratados em corpos receptores?',
    options: [
      'O efluente pode ter qualquer concentração de poluente se lançado à noite.',
      'O lançamento não pode alterar a classe de enquadramento do corpo receptor e deve cumprir padrões individuais de emissão (DBO, DQO, pH, metais, toxicidade).',
      'Basta diluir o efluente bruto com água potável da rede pública antes do descarte.',
      'É vedado qualquer tipo de tratamento biológico prévio.'
    ],
    correct_answer: 1,
    explanation: 'A CONAMA 430 veda expressamente a diluição como método de atenuação e exige respeito aos padrões de emissão e à manutenção da classe do corpo hídrico receptor.',
    skills: ['CONAMA 430', 'Effluent Standards', 'Water Basin Compliance']
  },
  {
    id: 'env-5',
    assessment_profile: 'ENVIRONMENTAL_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Em perícia forense de contaminação subterrânea por hidrocarbonetos de petróleo (LNAPL), como se posiciona a fase livre no aquífero freático?',
    options: [
      'Decanta instantaneamente no fundo do aquífero confinado por ter densidade maior que a água.',
      'Flutua no topo da franja capilar da zona saturada por apresentar densidade menor que a água (Light Non-Aqueous Phase Liquid).',
      'Desaparece completamente em contato com oxigênio atmosférico.',
      'Solidifica-se formando blocos rochosos cristalinos em menos de 24 horas.'
    ],
    correct_answer: 1,
    explanation: 'LNAPLs (gasolina, diesel) são menos densos que a água e se acumulam sobre o lençol freático, ao contrário dos DNAPLs que migram para a base rochosa.',
    skills: ['Environmental Forensics', 'LNAPL Hydrocarbons', 'Groundwater Contamination']
  },
  {
    id: 'env-6',
    assessment_profile: 'ENVIRONMENTAL_ENGINEERING',
    difficulty: 'HARD',
    question: 'Na avaliação de passivos ambientais para Due Diligence M&A em complexos industriais com base na ASTM E1527-21, qual a finalidade da Fase I (Phase I ESA)?',
    options: [
      'Executar escavações profundas e remediação térmica de todo o subsolo.',
      'Identificar Condições Ambientais Reconhecidas (RECs) por meio de revisão histórica documental, vistorias técnicas não-intrusivas e entrevistas com operadores.',
      'Garantir isenção de pagamento de impostos municipais.',
      'Construir uma estação de tratamento de esgoto imediata.'
    ],
    correct_answer: 1,
    explanation: 'A Fase I da ESA identifica histórico e presença potencial de contaminações sem amostragem destrutiva de solo e água, servindo de base para a Fase II intrusiva.',
    skills: ['ASTM E1527-21', 'Phase I ESA', 'Environmental Due Diligence']
  },

  // ==========================================
  // MINING
  // ==========================================
  {
    id: 'min-1',
    assessment_profile: 'MINING',
    difficulty: 'EASY',
    question: 'Em barragens de contenção de rejeitos de mineração, qual método construtivo possui o maior histórico de risco geotécnico e foi banido pela legislação brasileira (Lei nº 14.066/2020)?',
    options: [
      'Alteamento para jusante.',
      'Alteamento a montante (upstream raising method).',
      'Linha de centro (centerline).',
      'Pilhas de rejeito seco compactado e filtrado (dry stacking).'
    ],
    correct_answer: 1,
    explanation: 'O método a montante apoia novos diques sobre rejeitos hidraulicamente depositados não consolidados, propensos a liquefação estática.',
    skills: ['Dam Safety', 'ANM Compliance', 'Geotechnical Engineering']
  },
  {
    id: 'min-2',
    assessment_profile: 'MINING',
    difficulty: 'EASY',
    question: 'Qual sensor geofísico é essencial para monitorar deformações milimétricas na crista e taludes de cavas e barragens em tempo real?',
    options: [
      'Termômetro comum de mercúrio.',
      'Radar interferométrico de abertura sintética baseado em solo (GB-InSAR) e prismas topográficos robotizados.',
      'Sensor acústico para música ambiente.',
      'Luxímetro de luz visível.'
    ],
    correct_answer: 1,
    explanation: 'Sistemas GB-InSAR e estações totais robotizadas com prismas detectam vetores de deslocamento superficial milimétricos com alta frequência temporal.',
    skills: ['GB-InSAR Radar', 'Slope Monitoring', 'Mine Geotechnics']
  },
  {
    id: 'min-3',
    assessment_profile: 'MINING',
    difficulty: 'MEDIUM',
    question: 'Qual o mecanismo geotécnico primário desencadeador de rupturas catastróficas por liquefação estática em rejeitos de minério de ferro?',
    options: [
      'Secagem completa do rejeito com evaporação da água de poros.',
      'Geração abrupta de excesso de poropressão sob carregamento não-drenado em materiais granulares saturados frouxos com perda drástica de resistência ao cisalhamento.',
      'Resfriamento do rejeito abaixo de zero grau Celsius.',
      'Cristalização de quartzo no topo do dique de contenção.'
    ],
    correct_answer: 1,
    explanation: 'A liquefação estática ocorre quando a tensão cisalhante é transferida para a água dos poros em materiais contráteis, anulando a tensão efetiva do esqueleto sólido.',
    skills: ['Static Liquefaction', 'Pore Pressure', 'Geotechnical Modeling']
  },
  {
    id: 'min-4',
    assessment_profile: 'MINING',
    difficulty: 'MEDIUM',
    question: 'Na caracterização geoquímica de estéreis e rejeitos de mineração, qual teste determina o potencial de Drenagem Ácida de Mina (DAM)?',
    options: [
      'Teste de impacto mecânico de britagem.',
      'Balanço Ácido-Base (ABA - Acid Base Accounting) e teste de geração de potencial líquido de acidez (NAG Test).',
      'Espectrometria de fluorescência sem reagentes químicos.',
      'Medição de temperatura de chama em bico de Bunsen.'
    ],
    correct_answer: 1,
    explanation: 'O teste ABA avalia a relação entre o Potencial de Acidez (AP, oxidação de sulfetos como pirita) e o Potencial de Neutralização (NP, carbonatos).',
    skills: ['Acid Mine Drainage (DAM)', 'Acid Base Accounting (ABA)', 'Geochemistry']
  },
  {
    id: 'min-5',
    assessment_profile: 'MINING',
    difficulty: 'MEDIUM',
    question: 'Em sondagem geológica e geotécnica para exploração mineral, qual o ensaio in-situ amplamente utilizado para estimar compacidade e capacidade de carga?',
    options: [
      'Standard Penetration Test (SPT) associado à medição do índice N de golpes.',
      'Análise de DNA de bactérias do solo.',
      'Teste de estresse acústico sem perfuração.',
      'Medição de ondas de rádio FM na superfície.'
    ],
    correct_answer: 0,
    explanation: 'O ensaio SPT afere a resistência à penetração dinâmica por meio do número de golpes N necessários para cravar o amostrador bipartido a cada 45 cm.',
    skills: ['Geotechnical Drilling', 'SPT Testing', 'Mineral Exploration']
  },
  {
    id: 'min-6',
    assessment_profile: 'MINING',
    difficulty: 'HARD',
    question: 'Como a tecnologia de empilhamento de rejeito filtrado a seco (Dry Stacking) elimina a necessidade de barragens com bacias de acumulação de água?',
    options: [
      'Queimando o minério em fornos a 1500 °C até evaporar o ferro.',
      'Desaguamento mecânico por filtros prensa ou a vácuo até umidade ótima, permitindo transporte por correias ou caminhões e compactação geotécnica em bancadas estáveis.',
      'Despejando o rejeito diretamente no oceano sem tratamento prévio.',
      'Misturando plástico fundido ao rejeito para torná-lo impermeável.'
    ],
    correct_answer: 1,
    explanation: 'Filtros prensa industriais reduzem a umidade dos rejeitos a níveis que viabilizam o espalhamento, compactação e estabilidade geotécnica em pilhas secas.',
    skills: ['Dry Stacking', 'Tailings Dewatering', 'Mine Waste Engineering']
  },

  // ==========================================
  // GEOAI
  // ==========================================
  {
    id: 'geo-1',
    assessment_profile: 'GEOAI',
    difficulty: 'EASY',
    question: 'Qual índice espectral derivado de bandas vermelho e infravermelho próximo (NIR) é a referência clássica para quantificar vigor vegetativo e biomassa?',
    options: [
      'NDWI (Normalized Difference Water Index).',
      'NDVI (Normalized Difference Vegetation Index): (NIR - Red) / (NIR + Red).',
      'NBR (Normalized Burn Ratio) com infravermelho de ondas curtas (SWIR).',
      'Índice de refractância UV puro.'
    ],
    correct_answer: 1,
    explanation: 'O NDVI contrasta a forte absorção da clorofila na faixa do vermelho com a alta refletância da estrutura celular foliar no infravermelho próximo (NIR).',
    skills: ['NDVI', 'Remote Sensing', 'Multispectral Analysis']
  },
  {
    id: 'geo-2',
    assessment_profile: 'GEOAI',
    difficulty: 'EASY',
    question: 'Ao trabalhar com dados de satélites ópticos como Sentinel-2 e Landsat-9, qual a principal limitação operacional em regiões tropicais úmidas?',
    options: [
      'Os satélites não transmitem dados para receptores na América do Sul.',
      'Cobertura persistente de nuvens e névoa atmosférica, demandando fusão de dados com sensores de Radar de Abertura Sintética (SAR) como Sentinel-1.',
      'A luz solar não atinge áreas com árvores altas.',
      'Impossibilidade de gerar arquivos no formato GeoTIFF.'
    ],
    correct_answer: 1,
    explanation: 'Satélites ópticos são bloqueados por nuvens; sensores de micro-ondas SAR (banda C/L) penetram nuvens e operam dia e noite.',
    skills: ['SAR Sentinel-1', 'Optical vs Radar', 'Cloud Penetration']
  },
  {
    id: 'geo-3',
    assessment_profile: 'GEOAI',
    difficulty: 'MEDIUM',
    question: 'Em modelos de Deep Learning para segmentação semântica de ortomosaicos aéreos de alta resolução (ex: U-Net ou SegFormer), como evitar perda de precisão espacial nos limites de classes?',
    options: [
      'Reduzir a resolução da imagem para 10x10 pixels.',
      'Empregar conexões residuais (skip connections) entre o encoder e o decoder combinadas com funções de perda sensíveis a bordas (Dice Loss + Focal Loss).',
      'Usar apenas regressão linear sem convoluções.',
      'Classificar cada pixel de forma independente sem olhar os vizinhos espaciais.'
    ],
    correct_answer: 1,
    explanation: 'Skip connections transmitem características de alta resolução das camadas iniciais diretamente para o decoder, preservando limites de estradas, rios e taludes.',
    skills: ['Semantic Segmentation', 'U-Net / SegFormer', 'GeoAI Architectures']
  },
  {
    id: 'geo-4',
    assessment_profile: 'GEOAI',
    difficulty: 'MEDIUM',
    question: 'Qual a vantagem da tecnologia LiDAR (Light Detection and Ranging) em relação à fotogrametria com drones para estimativa de biomassa e Modelo Digital de Terreno (MDT) sob dossel florestal denso?',
    options: [
      'LiDAR custa menos que uma câmera comum de smartphone.',
      'O feixe laser multieco emite pulsos capazes de penetrar frestas do dossel e registrar os retornos do solo real, distinguindo copa vegetal (MDS) de relevo basal (MDT).',
      'LiDAR requer contato físico direto com os troncos das árvores.',
      'LiDAR gera apenas arquivos monocromáticos sem coordenadas espaciais.'
    ],
    correct_answer: 1,
    explanation: 'Pulsos LiDAR de múltiplos ecos atravessam a folhagem até o solo verdadeiro, permitindo a separação precisa da altura da vegetação (CHM) e topografia real.',
    skills: ['LiDAR Tech', 'DTM / DSM Generation', 'Canopy Height Models']
  },
  {
    id: 'geo-5',
    assessment_profile: 'GEOAI',
    difficulty: 'MEDIUM',
    question: 'Em processamento massivo de séries temporais de satélites no Google Earth Engine (GEE), qual prática otimiza a execução de redutores zonais em escala de bacias hidrográficas?',
    options: [
      'Fazer download de todos os arquivos raster para o computador pessoal antes de processar.',
      'Aplicar máscaras de nuvens via QA bands, filtrar coleções por geometria e datas estritas e utilizar redutores paralelos no lado do servidor com resolução nominal parametrizada.',
      'Executar loops FOR aninhados no cliente JavaScript.',
      'Converter todos os rasters para formato texto CSV sem compressão.'
    ],
    correct_answer: 1,
    explanation: 'GEE opera em computação paralela preguiçosa (lazy evaluation) do lado do servidor; filtrar no servidor antes do reducer otimiza o grafo de execução de chunks.',
    skills: ['Google Earth Engine (GEE)', 'Zonal Reducers', 'Server-Side Cloud Computing']
  },
  {
    id: 'geo-6',
    assessment_profile: 'GEOAI',
    difficulty: 'HARD',
    question: 'Em algoritmos GeoAI para detecção preditiva de desmatamento ilegal e abertura de pistas clandestinas, como mitigar o desbalanceamento de classes (extrema raridade do evento)?',
    options: [
      'Remover todas as imagens que contêm desmatamento do conjunto de treino.',
      'Uso de Hard Example Mining, amostragem balanceada espaço-temporal, Focal Loss e verificação com séries temporais de autocorrelação espacial (Moran’s I).',
      'Configurar o modelo para sempre prever classe negativa.',
      'Classificar apenas florestas localizadas em áreas urbanas.'
    ],
    correct_answer: 1,
    explanation: 'Focal Loss penaliza exemplos fáceis e foca o gradiente em exemplos raros e difíceis, enquanto estatísticas espaciais (Moran’s I) reduzem falsos positivos.',
    skills: ['Class Imbalance', 'Spatial Autocorrelation', 'Deforestation Alerts']
  },

  // ==========================================
  // RENEWABLE_ENERGY
  // ==========================================
  {
    id: 'ren-1',
    assessment_profile: 'RENEWABLE_ENERGY',
    difficulty: 'EASY',
    question: 'Qual o papel fundamental dos inversores fotovoltaicos grid-tie em usinas solares centralizadas?',
    options: [
      'Armazenar água destilada para limpeza manual dos painéis.',
      'Converter a corrente contínua (CC) gerada pelos módulos fotovoltaicos em corrente alternada (CA) sincronizada em tensão e frequência com a rede elétrica da distribuidora/transmissora.',
      'Bloquear a passagem de qualquer elétron quando houver sol.',
      'Substituir os transformadores elevadores de alta tensão da subestação.'
    ],
    correct_answer: 1,
    explanation: 'Inversores convertem CC em CA com máxima eficiência e realizam rastreamento do ponto de máxima potência (MPPT) dos arranjos fotovoltaicos.',
    skills: ['Solar Inverters', 'MPPT Tracking', 'Grid Connection']
  },
  {
    id: 'ren-2',
    assessment_profile: 'RENEWABLE_ENERGY',
    difficulty: 'EASY',
    question: 'O que define a métrica LCOE (Levelized Cost of Energy) em projetos de energia renovável e transição energética?',
    options: [
      'O preço de compra de um painel solar no varejo.',
      'O custo líquido presente da construção e operação de uma usina durante sua vida útil dividido pela energia total líquida gerada no período ($/MWh).',
      'A velocidade máxima do vento durante uma tempestade.',
      'O valor da conta de energia elétrica residencial comum.'
    ],
    correct_answer: 1,
    explanation: 'LCOE expressa o preço mínimo de venda da energia ($/MWh ou R$/MWh) necessário para que o empreendimento atinja o ponto de equilíbrio financeiro.',
    skills: ['LCOE Metric', 'Project Finance', 'Energy Economics']
  },
  {
    id: 'ren-3',
    assessment_profile: 'RENEWABLE_ENERGY',
    difficulty: 'MEDIUM',
    question: 'Em sistemas de eletrólise de água para produção de Hidrogênio Verde (H2V), qual a vantagem tecnológica dos eletrolisadores PEM (Proton Exchange Membrane) frente aos alcalinos tradicionais?',
    options: [
      'Eletrolisadores PEM operam apenas com água salobra sem tratamento.',
      'Capacidade de resposta dinâmica em segundos para acompanhar flutuações de geração solar/eólica, maior densidade de corrente e operação em alta pressão diferencial.',
      'Custo zero de investimento inicial.',
      'Eletrolisadores PEM não necessitam de catalisadores de metais nobres.'
    ],
    correct_answer: 1,
    explanation: 'A tecnologia PEM responde rapidamente à intermitência de fontes renováveis variáveis sem sofrer danos estruturais em transientes rápidos de carga.',
    skills: ['PEM Electrolysis', 'Green Hydrogen (H2V)', 'Intermittent Balancing']
  },
  {
    id: 'ren-4',
    assessment_profile: 'RENEWABLE_ENERGY',
    difficulty: 'MEDIUM',
    question: 'Em subestações de usinas solares de grande porte conectadas à Rede Básica do SIN (Sistema Interligado Nacional), qual a função dos sistemas FACTS (ex: STATCOM)?',
    options: [
      'Girar os painéis solares para baixo durante tempestades.',
      'Fornecer compensação dinâmica de potência reativa em tempo real para controle e estabilização de tensão no Ponto de Conexão Comum (PCC) em conformidade com os Procedimentos de Rede do ONS.',
      'Armazenar diesel para geradores de emergência.',
      'Converter corrente contínua em ondas de rádio.'
    ],
    correct_answer: 1,
    explanation: 'STATCOMs fornecem ou absorvem reativos instantaneamente, evitando oscilações ou colapsos de tensão no PCC exigidos pelo submódulo do ONS.',
    skills: ['STATCOM / FACTS', 'Grid Code / ONS', 'Reactive Power Compensation']
  },
  {
    id: 'ren-5',
    assessment_profile: 'RENEWABLE_ENERGY',
    difficulty: 'MEDIUM',
    question: 'Na integração entre Usinas Solares Fotovoltaicas e Data Centers com certificação Uptime Tier III/IV, qual a topologia indispensável para manter SLA de 99.982%?',
    options: [
      'Conexão direta dos módulos nos servidores sem nobreak.',
      'Arquitetura híbrida com geração solar dedicada, bancos de baterias BESS (LFP) com redundância 2N e geradores síncronos de backup com comutação ininterrupta.',
      'Desligamento dos servidores durante dias nublados ou chuvosos.',
      'Uso de rede elétrica pública monofásica sem proteção contra transientes.'
    ],
    correct_answer: 1,
    explanation: 'Tier III/IV exige caminhos de distribuição eletromecânica simultaneamente manuteníveis com nobreaks BESS e fontes auxiliares redundantes sem corte.',
    skills: ['Solar + Data Centers', 'Tier III/IV Reliability', 'BESS Storage']
  },
  {
    id: 'ren-6',
    assessment_profile: 'RENEWABLE_ENERGY',
    difficulty: 'HARD',
    question: 'Em usinas solares flutuantes (Floating PV) instaladas em reservatórios hidrelétricos, quais os dois efeitos combinados benéficos de maior relevância técnica e ambiental?',
    options: [
      'Aumento da temperatura dos módulos e elevação da salinidade da represa.',
      'Resfriamento natural dos módulos fotovoltaicos pela água (aumentando a eficiência de geração em até 10-15%) e redução drástica das perdas hídricas por evaporação do espelho d’água.',
      'Transformação da água doce em combustível fóssil.',
      'Paralisação das turbinas hidráulicas para sempre.'
    ],
    correct_answer: 1,
    explanation: 'O efeito de arrefecimento da água eleva o rendimento fotoelétrico dos semicondutores e a cobertura física sombreia o lago, mitigando evaporação.',
    skills: ['Floating Solar (FPV)', 'Thermal Efficiency', 'Evaporation Mitigation']
  },

  // ==========================================
  // MARITIME
  // ==========================================
  {
    id: 'mar-1',
    assessment_profile: 'MARITIME',
    difficulty: 'EASY',
    question: 'Qual Convenção Internacional da Organização Marítima Internacional (IMO) regulamenta rigorosamente a prevenção da poluição marinha por navios?',
    options: [
      'Convenção de Genebra sobre Trânsito Aéreo.',
      'Convenção MARPOL 73/78 (com seus Anexos I a VI).',
      'Tratado de Tordesilhas.',
      'Norma ISO 9001 de qualidade de escritórios.'
    ],
    correct_answer: 1,
    explanation: 'MARPOL 73/78 é o principal tratado global de combate à poluição marinha por hidrocarbonetos, substâncias nocivas, esgoto, lixo e emissões atmosféricas.',
    skills: ['MARPOL Convention', 'IMO Standards', 'Marine Environmental Law']
  },
  {
    id: 'mar-2',
    assessment_profile: 'MARITIME',
    difficulty: 'EASY',
    question: 'Em águas de lastro de embarcações comerciais, qual o risco biológico severo que a Convenção BWM (Ballast Water Management) combate?',
    options: [
      'Geração de oxigênio em excesso na superfície do mar.',
      'Introdução e dispersão de espécies exóticas invasoras e patógenos que destroem ecossistemas aquáticos nativos e infraestruturas estuarinas.',
      'Diminuição do peso do navio durante a atracação.',
      'Dissolução de rochas de granito do fundo do mar.'
    ],
    correct_answer: 1,
    explanation: 'Águas de lastro descarregadas sem tratamento translocam espécies invasoras (ex: mexilhão-dourado) com graves impactos ecológicos e econômicos.',
    skills: ['Ballast Water (BWM)', 'Invasive Species', 'Port Biosafety']
  },
  {
    id: 'mar-3',
    assessment_profile: 'MARITIME',
    difficulty: 'MEDIUM',
    question: 'Em terminais portuários sustentáveis ("Green Ports"), qual a função dos sistemas de Cold Ironing (Onshore Power Supply - OPS)?',
    options: [
      'Resfriar a carga de alimentos utilizando gelo seco importado.',
      'Fornecer energia elétrica de terra para navios atracados, permitindo o desligamento de seus motores auxiliares a diesel e zerando emissões locais no cais.',
      'Congelar os cascos dos navios para limpeza de cracas.',
      'Substituir guindastes elétricos por tração manual.'
    ],
    correct_answer: 1,
    explanation: 'Cold Ironing conecta navios à rede elétrica do cais durante a estadia, eliminando a queima contínua de óleo combustível perto de zonas urbanas.',
    skills: ['Cold Ironing / OPS', 'Green Ports', 'Decarbonization']
  },
  {
    id: 'mar-4',
    assessment_profile: 'MARITIME',
    difficulty: 'MEDIUM',
    question: 'Como sistemas de visão computacional e telemetria de boias oceanográficas atuam no combate a descargas ilícitas de óleo em canais portuários?',
    options: [
      'Disparando redes de pesca sobre os navios em alto-mar.',
      'Detecção de reflexão óptica e fluorescência de hidrocarbonetos na superfície da água combinada com dados AIS para identificação inequívoca da embarcação infratora.',
      'Pintando a água com corantes fosforescentes.',
      'Desligando o motor do navio remotamente via sinal de rádio FM.'
    ],
    correct_answer: 1,
    explanation: 'Sensores de hidrocarbonetos e câmeras térmicas/multiespectrais associadas à rota AIS comprovam a autoria da mancha com valor probatório para autoridades.',
    skills: ['Hydrocarbon Surveillance', 'AIS Tracking', 'Port Monitoring']
  },
  {
    id: 'mar-5',
    assessment_profile: 'MARITIME',
    difficulty: 'MEDIUM',
    question: 'Qual o princípio hidrodinâmico do calado dinâmico (Squat Effect) que deve ser monitorado em tempo real na navegação de grandes navios graneleiros e porta-contêineres em canais de acesso rasos?',
    options: [
      'O navio sobe acima do nível da água quando acelera.',
      'O navio tende a afundar e trimar devido à queda de pressão estática na água ao redor do casco em movimento em águas confinadas (Efeito Bernoulli), reduzindo a folga sob a quilha (UKC).',
      'O navio ganha peso devido à gravidade do fundo marinho.',
      'A água do mar ferve quando o navio passa em alta velocidade.'
    ],
    correct_answer: 1,
    explanation: 'O Efeito Squat reduz a folga líquida sob a quilha (Under Keel Clearance - UKC); sua predição matemática previne encalhes catastróficos em canais dragados.',
    skills: ['Squat Effect', 'Under Keel Clearance (UKC)', 'Hydrodynamics']
  },
  {
    id: 'mar-6',
    assessment_profile: 'MARITIME',
    difficulty: 'HARD',
    question: 'Em obras de dragagem portuária para aprofundamento de canais de navegação, qual a exigência do plano de gestão ambiental para dispersão de plumas de sedimentos?',
    options: [
      'A dragagem só pode ser realizada sem o uso de qualquer embarcação.',
      'Monitoramento contínuo de turbidez com cortinas de contenção de sedimentos (silt curtains), modelagem hidrodinâmica de dispersão e proibição de descarte em áreas de berçários ecológicos.',
      'Despejar todo o sedimento dragado sobre praias urbanas no horário de pico.',
      'Adicionar cimento em pó na água do mar para endurecer os sedimentos suspensos.'
    ],
    correct_answer: 1,
    explanation: 'Plumas de turbidez reduzem a fotossíntese de pradarias marinhas e sufocam bentos; seu controle exige boias de turbidez e janelas operacionais maré-dependentes.',
    skills: ['Dredging Environmental Management', 'Silt Curtains', 'Turbidity Monitoring']
  },

  // ==========================================
  // ESG
  // ==========================================
  {
    id: 'esg-1',
    assessment_profile: 'ESG',
    difficulty: 'EASY',
    question: 'No Protocolo GHG (Greenhouse Gas Protocol), como são classificadas as emissões de Escopo 1, 2 e 3 de uma organização?',
    options: [
      'Escopo 1: emissões de aviões; Escopo 2: carros; Escopo 3: bicicletas.',
      'Escopo 1: emissões diretas de fontes próprias/controladas; Escopo 2: emissões indiretas da eletricidade adquirida; Escopo 3: todas as outras emissões indiretas na cadeia de valor.',
      'Escopo 1: emissões passadas; Escopo 2: presentes; Escopo 3: futuras estimadas.',
      'Escopo 1: emissões em terra; Escopo 2: no ar; Escopo 3: no mar.'
    ],
    correct_answer: 1,
    explanation: 'O GHG Protocol separa o inventário em: Escopo 1 (diretas da operação), Escopo 2 (consumo de energia comprada) e Escopo 3 (cadeia de suprimentos e ciclo de vida).',
    skills: ['GHG Protocol', 'Scope 1/2/3', 'Carbon Accounting']
  },
  {
    id: 'esg-2',
    assessment_profile: 'ESG',
    difficulty: 'EASY',
    question: 'Qual a definição do conceito de "Dupla Materialidade" (Double Materiality) consolidado na diretiva europeia CSRD?',
    options: [
      'Utilizar dois computadores diferentes para preencher relatórios de sustentabilidade.',
      'Avaliar conjuntamente a Materialidade de Impacto (como a empresa afeta as pessoas e o meio ambiente) e a Materialidade Financeira (como riscos ambientais afetam o valor financeiro da empresa).',
      'Pagar o dobro de impostos ambientais em anos fiscais pares.',
      'Medir apenas emissões de carbono descartando água e resíduos.'
    ],
    correct_answer: 1,
    explanation: 'Dupla Materialidade exige visão bidirecional: o impacto externo da empresa no ecossistema e o impacto dos riscos climáticos no balanço patrimonial da empresa.',
    skills: ['CSRD / Double Materiality', 'ESG Governance', 'Materiality Assessment']
  },
  {
    id: 'esg-3',
    assessment_profile: 'ESG',
    difficulty: 'MEDIUM',
    question: 'Em governança corporativa de sustentabilidade, qual framework internacional estrutura a divulgação de riscos e oportunidades financeiras associadas ao clima?',
    options: [
      'Código de Trânsito Brasileiro.',
      'TCFD (Task Force on Climate-related Financial Disclosures) / IFRS S2 Climate-related Disclosures.',
      'Regulamento da Fórmula 1.',
      'Norma de etiquetagem de vestuário esportivo.'
    ],
    correct_answer: 1,
    explanation: 'TCFD e IFRS S2 estabelecem pilares formais de Governança, Estratégia, Gestão de Riscos e Métricas/Metas para riscos climáticos físicos e de transição.',
    skills: ['TCFD / IFRS S2', 'Climate Risk Management', 'Financial Disclosures']
  },
  {
    id: 'esg-4',
    assessment_profile: 'ESG',
    difficulty: 'MEDIUM',
    question: 'O que caracteriza uma prática de "Greenwashing" em relatórios corporativos e como uma auditoria técnica independente a desmascara?',
    options: [
      'Pintar as fachadas dos prédios industriais de tinta verde ecológica.',
      'Divulgar declarações ambientais superlativas, vagas ou enganosas sem lastro científico verificável; a auditoria exige rastreabilidade primária de dados, MRV e balanço de massa.',
      'Contratar biólogos para plantar mudas nativas na reserva legal.',
      'Instalar painéis solares em telhados de fábricas.'
    ],
    correct_answer: 1,
    explanation: 'Auditorias ambientais técnicas exigem evidências primárias, metodologias auditáveis e telemetria comprovada para corroborar qualquer alegação de neutralidade de carbono.',
    skills: ['Greenwashing Mitigation', 'Independent ESG Auditing', 'MRV Verification']
  },
  {
    id: 'esg-5',
    assessment_profile: 'ESG',
    difficulty: 'MEDIUM',
    question: 'Em métricas sociais (pilar S do ESG) para projetos de grande infraestrutura ou mineração, qual o procedimento recomendado para engajamento de comunidades tradicionais?',
    options: [
      'Início das obras sem aviso prévio para evitar discussões.',
      'Consulta Livre, Prévia e Informada (CLPI / FPIC) alinhada à Convenção 169 da OIT e aos Princípios do Equador.',
      'Envio de mensagens de texto anônimas pela internet.',
      'Oferta de brindes publicitários sem debate de impactos territoriais.'
    ],
    correct_answer: 1,
    explanation: 'A CLPI garante que comunidades locais participem das decisões que afetam seus territórios antes da emissão de licenças e início de obras estruturantes.',
    skills: ['Social Governance (S)', 'ILO 169 / FPIC', 'Equator Principles']
  },
  {
    id: 'esg-6',
    assessment_profile: 'ESG',
    difficulty: 'HARD',
    question: 'Em programas de integridade e conformidade regulatória (pilar G), qual o papel do canal de denúncias independente com garantia de não-retaliação?',
    options: [
      'Publicar fofocas sobre a vida pessoal dos diretores em redes sociais.',
      'Canal seguro, confidencial e auditado que permite a empregados e fornecedores reportar fraudes, assédios, infrações ambientais ou desvios de conduta sem receio de punição.',
      'Canal exclusivo para pedir aumento salarial direto ao presidente.',
      'Sistema de votação eletrônica para escolha do uniforme do time da empresa.'
    ],
    correct_answer: 1,
    explanation: 'Canais de denúncia com anonimato e proteção legal ao denunciante (whistleblower) são requisitos essenciais em normas anticorrupção (ex: ISO 37001).',
    skills: ['Corporate Governance (G)', 'Whistleblower Channels', 'ISO 37001 Anti-Bribery']
  },

  // ==========================================
  // SOFTWARE
  // ==========================================
  {
    id: 'soft-1',
    assessment_profile: 'SOFTWARE',
    difficulty: 'EASY',
    question: 'No design de microsserviços modernos, qual o papel do padrão Circuit Breaker (Disjuntor)?',
    options: [
      'Cortar a energia elétrica do computador quando houver sobrecarga física.',
      'Prevenir falhas em cascata interrompendo temporariamente requisições a serviços instáveis e permitindo degradação graciosa.',
      'Aumentar o número de threads da CPU ao infinito.',
      'Compilar o código TypeScript diretamente em linguagem binária sem checagem de tipos.'
    ],
    correct_answer: 1,
    explanation: 'Circuit Breakers monitoram falhas em chamadas remotas e abrem o circuito para evitar consumo de recursos e travar todo o ecossistema distribuído.',
    skills: ['Microservices Patterns', 'Circuit Breaker', 'Resilience Engineering']
  },
  {
    id: 'soft-2',
    assessment_profile: 'SOFTWARE',
    difficulty: 'EASY',
    question: 'Em bancos de dados relacionais com alta taxa de leitura, qual técnica de indexação é ideal para consultas com intervalos numéricos ou datas?',
    options: [
      'Hash Index.',
      'B-Tree / B+Tree Index.',
      'Full-Text Lucene Index.',
      'Nenhum índice, realizando Full Table Scan sequencial.'
    ],
    correct_answer: 1,
    explanation: 'Árvores B+Tree mantêm os dados ordenados, permitindo buscas por faixas (range queries: BETWEEN, >=, <=) com complexidade logarítmica O(log n).',
    skills: ['Database Indexing', 'B-Tree', 'Query Optimization']
  },
  {
    id: 'soft-3',
    assessment_profile: 'SOFTWARE',
    difficulty: 'MEDIUM',
    question: 'Ao implementar concorrência em sistemas de alta frequência, como o padrão CQRS (Command Query Responsibility Segregation) organiza o fluxo de dados?',
    options: [
      'Executa todas as operações em uma única função monolítica sem parâmetros.',
      'Separa o modelo de escrita (Commands que alteram estado com validação de regras) do modelo de leitura (Queries altamente otimizadas para consulta e visualização).',
      'Desliga a persistência em disco rígido.',
      'Obriga o usuário a reiniciar a aplicação após cada consulta.'
    ],
    correct_answer: 1,
    explanation: 'CQRS desacopla os caminhos de gravação e consulta, permitindo escalar e otimizar cada um de forma independente.',
    skills: ['CQRS Pattern', 'Domain-Driven Design', 'High-Performance Architecture']
  },
  {
    id: 'soft-4',
    assessment_profile: 'SOFTWARE',
    difficulty: 'MEDIUM',
    question: 'Em testes automatizados de software crítico, qual a distinção essencial entre testes unitários e testes de integração?',
    options: [
      'Testes unitários são executados manualmente e testes de integração não existem.',
      'Testes unitários isolam módulos específicos mockando dependências externas; testes de integração verificam a interação coordenada real entre múltiplos componentes (banco, APIs, filas).',
      'Testes de integração só funcionam em sistemas operacionais legados.',
      'Testes unitários não podem conter asserções de igualdade.'
    ],
    correct_answer: 1,
    explanation: 'Testes de integração validam as fronteiras e comunicações reais entre subsistemas, enquanto testes unitários garantem a lógica isolada de funções.',
    skills: ['Automated Testing', 'Unit vs Integration Tests', 'Software Quality']
  },
  {
    id: 'soft-5',
    assessment_profile: 'SOFTWARE',
    difficulty: 'MEDIUM',
    question: 'Ao construir APIs RESTful resilientes, o que significa um método ser classificado como "Idempotente"?',
    options: [
      'O método nunca retorna nenhuma resposta ao cliente.',
      'Múltiplas requisições idênticas consecutivas produzem o mesmo efeito final no estado do servidor que uma única requisição (ex: PUT, DELETE).',
      'O método gera uma nova chave aleatória a cada milissegundo.',
      'O endpoint só pode ser chamado uma vez por ano.'
    ],
    correct_answer: 1,
    explanation: 'Idempotência garante que retentativas automáticas de requisição em caso de falha de rede transitória não dupliquem operações ou corrompam o estado.',
    skills: ['RESTful APIs', 'Idempotency', 'Network Reliability']
  },
  {
    id: 'soft-6',
    assessment_profile: 'SOFTWARE',
    difficulty: 'HARD',
    question: 'Em arquiteturas Event-Driven distribuídas, como o padrão Saga orquestra transações de longa duração sem depender de locks distribuídos bloqueantes (2PC)?',
    options: [
      'Trava todos os nós do cluster por 24 horas.',
      'Coordena uma sequência de transações locais em cada serviço, executando transações compensatórias pré-definidas para reverter efeitos colaterais caso uma etapa intermediária falhe.',
      'Descarta todos os registros com erro sem notificação.',
      'Salva tudo em memória volátil de roteadores Wi-Fi.'
    ],
    correct_answer: 1,
    explanation: 'O padrão Saga (orquestrado ou coreografado) utiliza transações compensatórias reversíveis para garantir consistência eventual sem deadlocks distribuídos.',
    skills: ['Saga Pattern', 'Distributed Transactions', 'Event-Driven Systems']
  },

  // ==========================================
  // CIVIL_ENGINEERING
  // ==========================================
  {
    id: 'civ-1',
    assessment_profile: 'CIVIL_ENGINEERING',
    difficulty: 'EASY',
    question: 'Em projetos estruturais de concreto armado segundo a ABNT NBR 6118, qual o Estado Limite Último (ELU)?',
    options: [
      'Estado associado apenas a pequenas fissuras cosméticas superficiais.',
      'Estado que determina a perda da capacidade resistente ou colapso estrutural, implicando risco imediato à segurança humana.',
      'Estado em que o concreto atinge temperatura de 100 °C.',
      'Momento de pintura da fachada do edifício.'
    ],
    correct_answer: 1,
    explanation: 'O ELU refere-se à ruína ou colapso total/parcial da estrutura, devendo ser evitado com coeficientes majoradores de cargas e minoradores de resistências.',
    skills: ['NBR 6118', 'Ultimate Limit State (ELU)', 'Structural Design']
  },
  {
    id: 'civ-2',
    assessment_profile: 'CIVIL_ENGINEERING',
    difficulty: 'EASY',
    question: 'Qual ensaio geotécnico de laboratório afere a permeabilidade de solos argilosos e arenosos para projetos de fundações e barragens?',
    options: [
      'Ensaio de permeabilidade de carga constante e carga variável (permeâmetros de solo).',
      'Teste de dureza Rockwell em parafusos de aço.',
      'Pesagem em balança de precisão sem água.',
      'Medição de condutividade térmica do vidro.'
    ],
    correct_answer: 0,
    explanation: 'Permeâmetros de carga variável (para solos finos) e constante (para solos grossos) determinam o coeficiente de condutividade hidráulica k de Darcy.',
    skills: ['Geotechnics', 'Soil Permeability', 'Hydrogeology']
  },
  {
    id: 'civ-3',
    assessment_profile: 'CIVIL_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Em obras de infraestrutura linear (ferrovias e rodovias), qual o objetivo do ensaio de Compactação Proctor e determinação do Índice de Suporte Califórnia (CBR/ISC)?',
    options: [
      'Medir a velocidade do vento na rodovia.',
      'Determinar a umidade ótima e massa específica aparente seca máxima do solo e quantificar a capacidade de suporte mecânica e expansão sob saturação.',
      'Pintar as faixas de pedestre com tinta refletiva.',
      'Calcular o custo do pedágio por quilômetro rodado.'
    ],
    correct_answer: 1,
    explanation: 'O ensaio Proctor e CBR afere se as camadas de subleito, sub-base e base suportam o tráfego rodoviário repetido sem deformações plásticas excessivas.',
    skills: ['Proctor Test', 'CBR / ISC', 'Pavement Engineering']
  },
  {
    id: 'civ-4',
    assessment_profile: 'CIVIL_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Na metodologia BIM (Building Information Modeling) nível 4D e 5D, quais dimensões são incorporadas ao modelo 3D?',
    options: [
      '4D: Realidade virtual; 5D: Viagem no tempo.',
      '4D: Planejamento temporal e cronograma construtivo; 5D: Orçamento, quantitativos e gestão de custos da obra.',
      '4D: Cores da fachada; 5D: Tipos de piso.',
      '4D: Altura do edifício; 5D: Largura do terreno.'
    ],
    correct_answer: 1,
    explanation: 'BIM 4D integra o fator tempo (schedule/Gantt) ao modelo tridimensional e BIM 5D adiciona controle de custos e quantitativos em tempo real.',
    skills: ['BIM 4D / 5D', 'Construction Management', 'Digital Twins']
  },
  {
    id: 'civ-5',
    assessment_profile: 'CIVIL_ENGINEERING',
    difficulty: 'MEDIUM',
    question: 'Em contenções geotécnicas de encostas urbanas, qual a diferença funcional entre cortinas atirantadas e muros de gabião?',
    options: [
      'Muros de gabião suportam qualquer altura sem limite de peso.',
      'Cortinas atirantadas utilizam tirantes protendidos ancorados em rocha/solo profundo para grandes empuxos; gabiões são estruturas de gravidade drenantes para alturas moderadas.',
      'Cortinas atirantadas são feitas de tecido de algodão simples.',
      'Gabiões são estruturas herméticas totalmente impermeáveis à água.'
    ],
    correct_answer: 1,
    explanation: 'Cortinas atirantadas transmitem esforços a camadas resistentes profundas via bulbos de ancoragem protendidos; gabiões agem pelo próprio peso e permeabilidade.',
    skills: ['Slope Stability', 'Retaining Walls', 'Geotechnical Anchors']
  },
  {
    id: 'civ-6',
    assessment_profile: 'CIVIL_ENGINEERING',
    difficulty: 'HARD',
    question: 'Ao projetar fundações profundas em estacas escavadas de grande diâmetro com lama bentonítica ou polimérica, qual o procedimento mandatório para garantir a integridade da base?',
    options: [
      'Concretar sem retirar o sedimento depositado no fundo da perfuração.',
      'Limpeza rigorosa de fundo (desareamento), verificação de decantação, concretagem submersa por tubo Tremie contínuo e ensaios de integridade PIT e prova de carga.',
      'Deixar a escavação aberta na chuva por 30 dias.',
      'Misturar areia seca solta no concreto usinado antes do lançamento.'
    ],
    correct_answer: 1,
    explanation: 'A concretagem submersa com Tremie contínuo impede a contaminação do concreto pelo fluido estabilizante e evita estrangulamentos ou vazios no fuste.',
    skills: ['Deep Foundations', 'Tremie Concrete', 'PIT Testing']
  },

  // ==========================================
  // FORESTRY
  // ==========================================
  {
    id: 'for-1',
    assessment_profile: 'FORESTRY',
    difficulty: 'EASY',
    question: 'No inventário florestal contínuo, qual o instrumento padrão utilizado para medir a altura de árvores em pé baseado em trigonometria?',
    options: [
      'Barômetro de mercúrio.',
      'Hipsômetro (ex: Vertex ou clinômetro Suunto).',
      'Termômetro infravermelho de cozinha.',
      'Balança analítica de precisão.'
    ],
    correct_answer: 1,
    explanation: 'Hipsômetros calculam a altura total e comercial através do ângulo de visada ao topo e à base e da distância horizontal conhecida até a árvore.',
    skills: ['Forest Inventory', 'Hypsometers', 'Dendrometry']
  },
  {
    id: 'for-2',
    assessment_profile: 'FORESTRY',
    difficulty: 'EASY',
    question: 'O que mede a variável dendrométrica DAP (Diâmetro à Altura do Peito) padronizada internacionalmente?',
    options: [
      'Diâmetro medido a 5 metros do solo.',
      'Diâmetro do tronco da árvore medido a 1,30 metro acima do nível do solo.',
      'Comprimento da maior raiz subterrânea.',
      'Espessura da copa em dias de chuva.'
    ],
    correct_answer: 1,
    explanation: 'O DAP a 1,30 m do solo é a convenção universal que padroniza cálculos volumétricos e estimativas alométricas de biomassa florestal.',
    skills: ['DAP (DBH)', 'Dendrometry', 'Biomass Modeling']
  },
  {
    id: 'for-3',
    assessment_profile: 'FORESTRY',
    difficulty: 'MEDIUM',
    question: 'Em restauração ecológica de Mata Atlântica e Cerrado, qual o papel das espécies vegetais do grupo pioneiro na sucessão ecológica primária/secundária?',
    options: [
      'Crescer apenas na sombra profunda e viver 300 anos.',
      'Crescimento rápido a pleno sol, cobertura rápida do solo, enriquecimento de matéria orgânica e criação de microclima favorável para espécies secundárias e clímax.',
      'Produzir madeira pesada não biodegradável.',
      'Eliminar a fauna nativa do local.'
    ],
    correct_answer: 1,
    explanation: 'Espécies pioneiras toleram radiação solar direta, atenuam temperatura de superfície e iniciam a ciclagem de nutrientes que viabiliza a regeneração.',
    skills: ['Ecological Succession', 'Pioneer Species', 'Native Restoration']
  },
  {
    id: 'for-4',
    assessment_profile: 'FORESTRY',
    difficulty: 'MEDIUM',
    question: 'Como a equação alométrica desenvolvida por Chave et al. estima o estoque de carbono e biomassa acima do solo (AGB) em florestas tropicais?',
    options: [
      'Multiplicando o número de folhas por dez.',
      'Integrando o Diâmetro à Altura do Peito (DAP), a Altura Total da árvore e a Densidade Básica da Madeira da espécie botânica.',
      'Pesando a árvore inteira arrancada com raiz viva.',
      'Utilizando apenas a latitude e longitude do ponto.'
    ],
    correct_answer: 1,
    explanation: 'A modelagem de Chave correlaciona DAP, altura e densidade específica da madeira para predição robusta da biomassa florestal sem corte destrutivo.',
    skills: ['Allometric Equations', 'AGB Carbon Accounting', 'Forestry Science']
  },
  {
    id: 'for-5',
    assessment_profile: 'FORESTRY',
    difficulty: 'MEDIUM',
    question: 'Qual o critério técnico para implantação de faixas de enriquecimento em áreas sob Manejo Florestal Sustentável de Uso Múltiplo na Amazônia?',
    options: [
      'Corte raso total de todas as espécies com fogo.',
      'Abertura de clareiras direcionadas de baixo impacto, preservação rigorosa de árvores matrizes porta-sementes e corte de cipós pré-colheita.',
      'Plantio exclusivo de espécies exóticas como pinus.',
      'Construção de barragens de terra em todos os cursos d’água.'
    ],
    correct_answer: 1,
    explanation: 'O manejo sustentável mantém árvores matrizes para regeneração natural, preserva a estrutura genética da floresta e mitiga danos com corte direcionado.',
    skills: ['Sustainable Forest Management', 'Seed Trees', 'Reduced-Impact Logging']
  },
  {
    id: 'for-6',
    assessment_profile: 'FORESTRY',
    difficulty: 'HARD',
    question: 'Em projetos de crédito de carbono florestal sob padrões internacionais de alta integridade (ex: Verra VCS / ART TREES), o que significa o conceito de "Linha de Base Dinâmica e Não-Permanência com Buffer Pool"?',
    options: [
      'Garantir que os créditos de carbono durem para sempre sem qualquer risco de incêndio.',
      'Modelar cenários críveis de desmatamento contrafactual sem o projeto e depositar uma fração de créditos em um fundo de reserva coletivo para cobrir eventuais perdas por incêndios ou eventos climáticos.',
      'Vender o dobro dos créditos gerados para aumentar o lucro imediato.',
      'Declarar que toda a floresta do planeta pertence a uma única empresa.'
    ],
    correct_answer: 1,
    explanation: 'Linhas de base dinâmicas comparam com áreas de controle reais e o Buffer Pool retém de 10% a 30% dos créditos como seguro compulsório contra reversões de carbono.',
    skills: ['Carbon Credits', 'Verra / ART TREES', 'Permanence & Buffer Pool']
  },

  // ==========================================
  // FORENSICS_AUDIT
  // ==========================================
  {
    id: 'for-aud-1',
    assessment_profile: 'FORENSICS_AUDIT',
    difficulty: 'EASY',
    question: 'Na perícia ambiental judicial (Código de Processo Civil), qual o princípio indispensável da "Cadeia de Custódia" de amostras periciais?',
    options: [
      'Guardar as amostras em sacolas plásticas sem identificação nem lacre.',
      'Registro formal, documentado, cronológico e auditável de todos os indivíduos que coletaram, transportaram, armazenaram e analisaram cada evidência, com lacres invioláveis.',
      'Publicar fotos das amostras antes de qualquer laudo técnico.',
      'Entregar as amostras para a parte investigada guardar em casa.'
    ],
    correct_answer: 1,
    explanation: 'A quebra da cadeia de custódia anula o valor probatório pericial em juízo, pois compromete a integridade e autenticidade da prova material.',
    skills: ['Chain of Custody', 'Judicial Forensics', 'Evidence Traceability']
  },
  {
    id: 'for-aud-2',
    assessment_profile: 'FORENSICS_AUDIT',
    difficulty: 'EASY',
    question: 'Em uma auditoria de conformidade legal ambiental baseada na ISO 14001, o que constitui uma "Não Conformidade Maior"?',
    options: [
      'Um pequeno erro de digitação no cabeçalho de uma planilha interna.',
      'A ausência total ou falha sistêmica de controle de um requisito legal ambiental obrigatório que resulte ou possa resultar em dano ambiental significativo ou passivo crítico.',
      'A escolha de uma cor diferente para o uniforme dos auditores.',
      'O cancelamento de uma reunião de alinhamento por motivo de chuva.'
    ],
    correct_answer: 1,
    explanation: 'Não conformidades maiores indicam colapso de controle operacional ou descumprimento de obrigação legal que compromete o desempenho ambiental global.',
    skills: ['ISO 14001', 'Major Non-Conformity', 'Environmental Compliance']
  },
  {
    id: 'for-aud-3',
    assessment_profile: 'FORENSICS_AUDIT',
    difficulty: 'MEDIUM',
    question: 'Em investigações periciais de derramamento de óleo no mar ou rios, qual ensaio geoquímico atua como "Impressão Digital" (Oil Fingerprinting) para determinar a fonte poluidora?',
    options: [
      'Medição de temperatura da água com termômetro caseiro.',
      'Cromatografia Gasosa Acoplada à Espectrometria de Massas (GC-MS) analisando biomarcadores petrogênicos diagnósticos (terpanos, esteranos, hidrocarbonetos policíclicos aromáticos alquilados).',
      'Checagem da cor do líquido a olho nu.',
      'Teste de solubilidade em água destilada.'
    ],
    correct_answer: 1,
    explanation: 'Razões diagnósticas de biomarcadores fósseis em GC-MS são imutáveis pelo intemperismo inicial e identificam exatamente a formação de origem do petróleo derramado.',
    skills: ['Oil Fingerprinting', 'GC-MS Biomarkers', 'Pollution Forensics']
  },
  {
    id: 'for-aud-4',
    assessment_profile: 'FORENSICS_AUDIT',
    difficulty: 'MEDIUM',
    question: 'Qual a metodologia jurídica e técnica aplicável para quantificação de Danos Ambientais Materiais e Interinos em ações civis públicas?',
    options: [
      'Escolha de um valor arbitrário sem qualquer método matemático.',
      'Métodos de Valoração Econômica Ambiental (Custo de Reposição, Custo de Controle, Método de Preços Hedônicos e Valoração Contingente) mensurando perda de serviços ecossistêmicos.',
      'Cobrança do valor de um bilhete de loteria premiado.',
      'Isenção total do poluidor se ele pedir desculpas em público.'
    ],
    correct_answer: 1,
    explanation: 'A valoração econômica apura custos de restauração in-situ mais compensação ecológica pelos serviços ecossistêmicos perdidos entre o dano e a recuperação plena.',
    skills: ['Environmental Damage Valuation', 'Ecosystem Services', 'Public Civil Actions']
  },
  {
    id: 'for-aud-5',
    assessment_profile: 'FORENSICS_AUDIT',
    difficulty: 'MEDIUM',
    question: 'Em auditorias forenses de integridade de dados laboratoriais, o que é a adulteração de cromatogramas por "Manual Integration Bias" e como detectá-la?',
    options: [
      'Desenhar gráficos à mão com giz de cera.',
      'Manipulação deliberada das linhas de base de integração de picos para ocultar contaminantes acima do limite; detectada através da análise de trilhas de auditoria (Audit Trails) nativas do software analítico.',
      'Imprimir relatórios em preto e branco.',
      'Substituir o solvente de limpeza por água corrente.'
    ],
    correct_answer: 1,
    explanation: 'Trilhas de auditoria (Audit Trails) em sistemas analíticos (21 CFR Part 11) registram alterações em parâmetros de integração de picos cromatográficos.',
    skills: ['Data Integrity', 'Audit Trails', 'Analytical Forensics']
  },
  {
    id: 'for-aud-6',
    assessment_profile: 'FORENSICS_AUDIT',
    difficulty: 'HARD',
    question: 'Em perícia de desastre ambiental com rompimento de estrutura geotécnica, qual o procedimento científico de reconstituição da gênese do colapso (Root Cause Analysis)?',
    options: [
      'Culpar imediatamente o clima sem inspecionar os projetos.',
      'Análise retroanalítica numérica (back-analysis) com propriedades geotécnicas pré-ruptura, confronto do histórico de instrumentação piezométrica com projeto executivo, inspeção de testemunhos de sondagem e modelagem de escoamento e deformação.',
      'Destruir todos os arquivos de projetos da barragem.',
      'Limpar a área com retroescavadeira antes da chegada dos peritos.'
    ],
    correct_answer: 1,
    explanation: 'A reconstituição pericial exige modelagem numérica retroanalítica, validação do histórico de poropressões e exames petrográficos e geotécnicos dos materiais da ruptura.',
    skills: ['Root Cause Analysis', 'Back-Analysis', 'Dam Failure Forensics']
  },

  // ==========================================
  // PROJECT_MANAGEMENT
  // ==========================================
  {
    id: 'pm-1',
    assessment_profile: 'PROJECT_MANAGEMENT',
    difficulty: 'EASY',
    question: 'No gerenciamento de projetos de engenharia complexa segundo o PMBOK, o que é a Estrutura Analítica do Projeto (EAP / WBS)?',
    options: [
      'A folha de pagamento de todos os funcionários.',
      'A decomposição hierárquica orientada a entregas do escopo total a ser executado pela equipe do projeto.',
      'Uma lista de telefones de fornecedores locais.',
      'O projeto elétrico de iluminação do canteiro.'
    ],
    correct_answer: 1,
    explanation: 'A EAP decompõe visual e logicamente o escopo total em pacotes de trabalho mensuráveis e atribuíveis a responsáveis específicos.',
    skills: ['WBS / EAP', 'Scope Management', 'PMBOK Standards']
  },
  {
    id: 'pm-2',
    assessment_profile: 'PROJECT_MANAGEMENT',
    difficulty: 'EASY',
    question: 'No método do Caminho Crítico (CPM - Critical Path Method), o que define as atividades situadas no caminho crítico?',
    options: [
      'Atividades que possuem folga total igual a zero; qualquer atraso nelas adia diretamente a data de conclusão do projeto.',
      'Atividades que custam menos de dez reais.',
      'Atividades executadas por estagiários.',
      'Tarefas que não possuem data de término definida.'
    ],
    correct_answer: 0,
    explanation: 'O caminho crítico é a sequência mais longa de tarefas dependentes com folga zero; gerenciar suas atividades é mandatório para evitar atrasos na entrega.',
    skills: ['Critical Path Method (CPM)', 'Schedule Management', 'Float Analysis']
  },
  {
    id: 'pm-3',
    assessment_profile: 'PROJECT_MANAGEMENT',
    difficulty: 'MEDIUM',
    question: 'Na Gestão do Valor Agregado (EVM - Earned Value Management), como se interpreta um Índice de Desempenho de Custos (IDC / CPI) igual a 0.85?',
    options: [
      'O projeto está gastando 15% a menos do que o planejado.',
      'O projeto está com estouro de custos: para cada R$ 1,00 gasto, apenas R$ 0,85 de valor de trabalho planejado está sendo entregue.',
      'O projeto terminou antes do prazo.',
      'O projeto foi cancelado pelo cliente.'
    ],
    correct_answer: 1,
    explanation: 'CPI = EV / AC. Um valor menor que 1.0 indica ineficiência financeira e sobrecusto em relação ao trabalho executado.',
    skills: ['Earned Value Management (EVM)', 'Cost Performance Index (CPI)', 'Budget Control']
  },
  {
    id: 'pm-4',
    assessment_profile: 'PROJECT_MANAGEMENT',
    difficulty: 'MEDIUM',
    question: 'Ao gerenciar contratos complexos de engenharia na modalidade EPC (Engineering, Procurement, Construction / Turnkey), qual o principal alocador de risco?',
    options: [
      'O cliente assume todos os riscos de atraso e estouro de orçamento.',
      'O contratado EPC assume a responsabilidade integrada pelo projeto detalhado, suprimentos e construção com preço fixo e garantia de performance operacional na entrega das chaves.',
      'Nenhum contrato é assinado por escrito.',
      'O fornecedor apenas vende parafusos avulsos sem garantia.'
    ],
    correct_answer: 1,
    explanation: 'Contratos EPC transferem a maior parte dos riscos técnicos e construtivos ao contratado principal, que deve entregar o ativo em plena operação testada.',
    skills: ['EPC Contracts', 'Risk Allocation', 'Turnkey Projects']
  },
  {
    id: 'pm-5',
    assessment_profile: 'PROJECT_MANAGEMENT',
    difficulty: 'MEDIUM',
    question: 'Em matrizes quantitativas de risco de projetos industriais (FMEA e Matriz de Riscos), como o Nível de Prioridade de Risco (RPN) é calculado?',
    options: [
      'RPN = Número de dias restantes no mês.',
      'RPN = Severidade do Impacto x Probabilidade de Ocorrência x Capacidade de Detecção do Risco.',
      'RPN = Preço das ações da empresa na bolsa.',
      'RPN = Quantidade de reuniões semanais agendadas.'
    ],
    correct_answer: 1,
    explanation: 'O FMEA multiplica Severidade, Ocorrência e Detecção para ranquear falhas e alocar planos de contingência preventivos prioritários.',
    skills: ['FMEA', 'Quantitative Risk Analysis', 'Contingency Planning']
  },
  {
    id: 'pm-6',
    assessment_profile: 'PROJECT_MANAGEMENT',
    difficulty: 'HARD',
    question: 'Em grandes programas multidisciplinares que integram engenharia física pesada e desenvolvimento ágil de IA/software (Framework Híbrido Stage-Gate + Agile), como sincronizar as cadências de entrega?',
    options: [
      'Excluir a equipe de software de todas as decisões do projeto.',
      'Adotar portões de fase contratuais (Gates de Viabilidade, FEED e Comissionamento) para os marcos físicos associados a Sprints ágeis iterativas com MVPs quinzenais para sistemas digitais e algoritmos.',
      'Paralisar as obras de engenharia civil toda vez que um commit de código falhar no GitHub.',
      'Substituir o cronograma mestre por mensagens em redes sociais.'
    ],
    correct_answer: 1,
    explanation: 'A gestão híbrida harmoniza os marcos contratuais rígidos de suprimentos e obras civis (Stage-Gate) com ciclos curtos de feedback contínuo em modelos de software e IA.',
    skills: ['Hybrid Project Management', 'Stage-Gate + Agile', 'Multidisciplinary Programs']
  }
];

