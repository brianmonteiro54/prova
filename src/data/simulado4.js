// Simulado 4 — Questões avançadas AWS DEA-C01 (65 questões)
// Cobre todos os 4 domínios da certificação

export const simulado4Questions = [
  // ===== DOMAIN 1: Data Ingestion and Transformation =====
  {
    id: 1, domain: 1,
    en: "A data engineer is using AWS Glue to process records and needs to ensure that previously processed data is not reprocessed in subsequent runs. Which Glue feature should be enabled?",
    pt: "Um engenheiro usa AWS Glue para processar registros e precisa garantir que dados já processados não sejam reprocessados em execuções subsequentes. Qual feature do Glue ativar?",
    options: ["Glue Workflow", "Glue Job Bookmarks", "Glue Data Quality", "Glue DynamicFrames"],
    correct: 1,
    explanations: [
      "ERRADO. Workflow orquestra crawlers e jobs, mas não rastreia dados processados.",
      "CORRETO! Job Bookmarks rastreiam dados já processados em execuções anteriores, evitando reprocessamento. Essencial para ETL incremental.",
      "ERRADO. Data Quality valida regras de qualidade nos dados, não rastreia processamento.",
      "ERRADO. DynamicFrames é a estrutura de dados do Glue, não controla o que foi processado."
    ]
  },
  {
    id: 2, domain: 1,
    en: "A company needs to process millions of small files in S3 in parallel using AWS Step Functions, with each file processed by a Lambda function independently. Which Step Functions state should be used?",
    pt: "Uma empresa precisa processar milhões de arquivos pequenos no S3 em paralelo usando Step Functions, cada um por uma Lambda independente. Qual estado do Step Functions usar?",
    options: ["Choice state", "Wait state", "Map state in Distributed mode", "Parallel state"],
    correct: 2,
    explanations: [
      "ERRADO. Choice state faz ramificações condicionais, não processa arrays.",
      "ERRADO. Wait state pausa a execução por tempo determinado.",
      "CORRETO! Map state em modo Distributed processa milhões de itens em paralelo (até 10.000 simultâneos). Ideal para processar arrays grandes de objetos S3.",
      "ERRADO. Parallel state executa branches fixos em paralelo (no máximo dezenas), não escala para milhões."
    ]
  },
  {
    id: 3, domain: 1,
    en: "A data engineer wants to develop and test AWS Glue ETL scripts interactively in a Jupyter notebook environment without provisioning a development endpoint. Which option should they use?",
    pt: "Um engenheiro quer desenvolver e testar scripts ETL do Glue interativamente em Jupyter sem provisionar development endpoint. Qual opção usar?",
    options: ["AWS Glue Studio visual editor", "AWS Glue Interactive Sessions", "Amazon EMR Notebooks", "AWS Cloud9"],
    correct: 1,
    explanations: [
      "ERRADO. Glue Studio é editor visual drag-and-drop, não interativo via Jupyter.",
      "CORRETO! Interactive Sessions permitem desenvolvimento Glue serverless via Jupyter/notebooks, sem development endpoints. Pague apenas pelo tempo de uso.",
      "ERRADO. EMR Notebooks são para EMR clusters, não para Glue.",
      "ERRADO. Cloud9 é IDE genérica, não tem integração nativa com Glue Spark."
    ]
  },
  {
    id: 4, domain: 1,
    en: "A streaming application uses Amazon Kinesis Data Streams. The data engineer notices uneven distribution of records across shards, with some shards being throttled. What is the BEST approach to fix this?",
    pt: "Aplicação de streaming usa Kinesis Data Streams. Engenheiro nota distribuição desigual entre shards, com alguns sendo throttled. Qual MELHOR abordagem?",
    options: [
      "Increase the number of shards uniformly",
      "Use a more random and high-cardinality partition key",
      "Enable enhanced fan-out",
      "Switch to on-demand capacity mode only"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Aumentar shards uniformemente não resolve a distribuição desigual — ainda há hot shards.",
      "CORRETO! Hot shards ocorrem quando muitos registros têm a mesma partition key. Chave de alta cardinalidade distribui uniformemente.",
      "ERRADO. Enhanced fan-out dá throughput dedicado a consumers, não distribui melhor a entrada.",
      "ERRADO. On-demand ajusta capacidade automaticamente, mas não resolve hot keys causadas por má escolha de partition key."
    ]
  },
  {
    id: 5, domain: 1,
    en: "A company uses Amazon EventBridge to trigger workflows. They need to schedule a Glue job to run every weekday at 8 AM UTC with cron-like flexibility and target a specific account/region. Which service is BEST?",
    pt: "Empresa usa EventBridge para triggers. Precisa agendar Glue job toda semana 8h UTC com flexibilidade cron, alvo em conta/região específica. Qual MELHOR serviço?",
    options: [
      "EventBridge Scheduler with cron expression",
      "EventBridge Rules with schedule expression",
      "AWS Lambda with CloudWatch alarm",
      "AWS Batch with cron job"
    ],
    correct: 0,
    explanations: [
      "CORRETO! EventBridge Scheduler é serviço dedicado para agendamentos, suporta cron, one-time, e tem alvo cross-account/cross-region nativamente.",
      "ERRADO. EventBridge Rules é mais limitado em targets cross-account; Scheduler é o sucessor recomendado.",
      "ERRADO. CloudWatch alarms disparam por métricas, não por agendamento simples — uso forçado.",
      "ERRADO. AWS Batch é para batch computing, não para agendamento de Glue jobs."
    ]
  },
  {
    id: 6, domain: 1,
    en: "A company is migrating an on-premises Hadoop cluster (200 TB) to AWS. The migration must be one-time and the company has limited internet bandwidth. Which service is MOST appropriate?",
    pt: "Empresa migra cluster Hadoop on-premises (200 TB) para AWS. Migração one-time, banda limitada. Qual serviço MAIS apropriado?",
    options: [
      "AWS DataSync over public internet",
      "AWS Snowball Edge",
      "AWS Direct Connect",
      "AWS Storage Gateway"
    ],
    correct: 1,
    explanations: [
      "ERRADO. DataSync via internet seria lento e caro com banda limitada para 200 TB.",
      "CORRETO! Snowball Edge é appliance físico com até 80 TB. Para 200 TB use múltiplos. Ideal para migrações offline com banda limitada.",
      "ERRADO. Direct Connect requer instalação de conexão dedicada, alto custo para migração one-time.",
      "ERRADO. Storage Gateway é para integração híbrida contínua, não migração one-time."
    ]
  },
  {
    id: 7, domain: 1,
    en: "A data engineer needs to process click-stream data with Apache Spark Structured Streaming on AWS, autoscaling based on workload. Which service should be used?",
    pt: "Engenheiro precisa processar clickstream com Spark Structured Streaming na AWS, autoscaling baseado em workload. Qual serviço?",
    options: [
      "AWS Glue Streaming ETL jobs",
      "Amazon EMR with manual scaling",
      "AWS Lambda with Kinesis trigger",
      "Amazon Athena for streaming"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Glue Streaming ETL é serverless, suporta Spark Structured Streaming, e tem autoscaling automático baseado na carga.",
      "ERRADO. EMR com manual scaling exige gerenciamento; não atende 'autoscaling automático'.",
      "ERRADO. Lambda não roda Spark — apenas código próprio com limites de tempo/memória.",
      "ERRADO. Athena é para queries SQL ad-hoc, não para streaming Spark."
    ]
  },
  {
    id: 8, domain: 1,
    en: "A company processes financial transactions and requires exactly-once delivery semantics with strict ordering per customer. Which messaging service should they use?",
    pt: "Empresa processa transações financeiras com exactly-once delivery e ordenação estrita por cliente. Qual serviço de mensageria?",
    options: [
      "Amazon SQS Standard",
      "Amazon SQS FIFO with MessageGroupId per customer",
      "Amazon SNS Standard topics",
      "Amazon Kinesis Data Streams without partition keys"
    ],
    correct: 1,
    explanations: [
      "ERRADO. SQS Standard é at-least-once com possíveis duplicatas — não atende exactly-once.",
      "CORRETO! SQS FIFO garante exactly-once delivery e ordenação. MessageGroupId por cliente preserva ordem por cliente em paralelo.",
      "ERRADO. SNS Standard é at-least-once sem ordenação garantida.",
      "ERRADO. Sem partition keys, Kinesis distribui aleatoriamente — não há ordenação por cliente."
    ]
  },
  {
    id: 9, domain: 1,
    en: "A data engineer runs an AWS Glue ETL job that reads from a JDBC source. The job is taking too long because reads are sequential. Which optimization helps the MOST?",
    pt: "Engenheiro roda Glue ETL com source JDBC. Job lento por leituras sequenciais. Qual otimização ajuda MAIS?",
    options: [
      "Increase the number of DPUs",
      "Use hashfield/hashexpression for parallel JDBC reads",
      "Convert source data to Parquet first",
      "Enable Glue job bookmarks"
    ],
    correct: 1,
    explanations: [
      "ERRADO. DPUs extras não ajudam se a leitura é sequencial — ficam ociosos esperando.",
      "CORRETO! hashfield/hashexpression dividem a query JDBC em múltiplos workers paralelos, distribuindo leitura entre executores Spark.",
      "ERRADO. A questão é sobre velocidade da leitura JDBC, não sobre formato.",
      "ERRADO. Bookmarks evitam reprocessamento, não aceleram leitura inicial."
    ]
  },
  {
    id: 10, domain: 1,
    en: "A company needs to ingest CDC (Change Data Capture) events from an on-premises Oracle database into an S3-based data lake in real-time. Which service combination is BEST?",
    pt: "Empresa precisa ingerir eventos CDC de Oracle on-premises para data lake S3 em tempo real. Qual combinação MELHOR?",
    options: [
      "AWS DMS with ongoing replication and Kinesis Data Streams target",
      "AWS DMS with full load only and S3 target",
      "AWS Glue with Oracle JDBC connector running daily",
      "AWS Database Migration Service with batch mode"
    ],
    correct: 0,
    explanations: [
      "CORRETO! DMS com ongoing replication captura CDC continuamente. Target Kinesis permite streaming real-time para o data lake.",
      "ERRADO. Full load only é one-time, não captura mudanças contínuas.",
      "ERRADO. Glue com schedule diário é batch, não real-time.",
      "ERRADO. 'Batch mode' contradiz 'real-time'."
    ]
  },
  {
    id: 11, domain: 1,
    en: "A data engineer wants to convert an existing Athena query result into a managed table stored in Parquet format with partitioning. Which Athena feature is MOST efficient?",
    pt: "Engenheiro quer converter resultado de query Athena em tabela gerenciada em Parquet particionado. Qual feature Athena MAIS eficiente?",
    options: [
      "INSERT INTO statements",
      "CREATE TABLE AS SELECT (CTAS)",
      "External table with manual partition addition",
      "AWS Glue ETL job"
    ],
    correct: 1,
    explanations: [
      "ERRADO. INSERT INTO requer tabela já existente; não cria a tabela com partições e formato.",
      "CORRETO! CTAS cria tabela diretamente da query, com formato (Parquet/ORC), particionamento e compressão configuráveis em uma única operação.",
      "ERRADO. Adicionar partições manualmente é trabalhoso e não converte formato.",
      "ERRADO. Glue ETL é overkill — CTAS resolve isso nativamente no Athena."
    ]
  },
  {
    id: 12, domain: 1,
    en: "A company uses AWS Lambda for stream processing of Kinesis records. They need to send failed batches to a separate destination for analysis without retrying. Which feature should they use?",
    pt: "Empresa usa Lambda para stream processing de Kinesis. Precisam enviar batches falhos para destino separado sem retry. Qual feature usar?",
    options: [
      "Lambda DLQ (Dead Letter Queue)",
      "Lambda Destinations with on-failure target",
      "EventBridge for failed invocations",
      "CloudWatch Logs subscription filter"
    ],
    correct: 1,
    explanations: [
      "ERRADO. DLQ funciona para invocações assíncronas, mas não para event source mappings (Kinesis).",
      "CORRETO! Lambda Destinations com on-failure permite rotear batches falhos do event source mapping (Kinesis/DynamoDB) para SQS, SNS, Lambda ou EventBridge — sem retry indefinido.",
      "ERRADO. EventBridge captura eventos AWS, não batches Lambda específicos.",
      "ERRADO. CloudWatch filters são para logs, não para roteamento de batches falhos."
    ]
  },
  {
    id: 13, domain: 1,
    en: "A data engineer needs to schedule complex DAG workflows with Python code, including dynamic task generation based on runtime data. Which AWS service fits BEST?",
    pt: "Engenheiro precisa agendar DAGs complexos com Python, incluindo geração dinâmica de tarefas em runtime. Qual serviço MELHOR?",
    options: [
      "AWS Step Functions",
      "Amazon MWAA (Managed Workflows for Apache Airflow)",
      "AWS Glue Workflows",
      "AWS Batch"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Step Functions usa JSON/ASL — geração dinâmica é limitada comparada a código Python.",
      "CORRETO! MWAA executa Apache Airflow gerenciado. DAGs em Python permitem lógica dinâmica complexa nativamente.",
      "ERRADO. Glue Workflows são limitados a triggers e jobs Glue — sem Python customizado para DAGs.",
      "ERRADO. AWS Batch é orquestração de jobs em fila, não DAGs com dependências."
    ]
  },
  {
    id: 14, domain: 1,
    en: "A real-time analytics application uses Amazon MSK (Managed Streaming for Kafka). The team wants to autoscale broker storage as data grows. Which feature should be enabled?",
    pt: "Aplicação real-time analytics usa Amazon MSK. Equipe quer autoscaling do storage dos brokers conforme cresce. Qual feature ativar?",
    options: [
      "MSK auto scaling for broker count",
      "MSK storage auto scaling (storage autoscaling policy)",
      "MSK Serverless mode",
      "MSK Connect with Source connectors"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Auto scaling de broker count adiciona brokers, não expande storage existente.",
      "CORRETO! MSK Storage Auto Scaling expande EBS dos brokers automaticamente baseado em utilização — sem downtime.",
      "ERRADO. Serverless mode tem outras características, não é específico para autoscaling de storage de brokers provisioned.",
      "ERRADO. MSK Connect é para integração com fontes externas, não scaling."
    ]
  },
  {
    id: 15, domain: 1,
    en: "A company is using Apache Hudi tables in their S3 data lake for ACID upserts. Which AWS service NATIVELY supports reading and writing Hudi tables?",
    pt: "Empresa usa tabelas Apache Hudi em data lake S3 para upserts ACID. Qual serviço AWS suporta NATIVAMENTE leitura/escrita Hudi?",
    options: [
      "Amazon Athena (with Hudi connector)",
      "AWS Glue ETL with Hudi format",
      "Amazon EMR with Hudi",
      "All of the above"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Athena suporta Hudi, mas não é a única opção.",
      "ERRADO. Glue suporta Hudi, mas não é a única.",
      "ERRADO. EMR suporta Hudi, mas não é a única.",
      "CORRETO! AWS suporta Hudi em Athena, Glue ETL e EMR nativamente. Hudi e Iceberg são padrões de transactional data lakes na AWS."
    ]
  },
  {
    id: 16, domain: 1,
    en: "A data engineer wants to optimize a Glue ETL job that processes a small reference table joined with a large fact table. Which optimization should they apply?",
    pt: "Engenheiro quer otimizar Glue ETL com tabela de referência pequena joinada com tabela fato grande. Qual otimização aplicar?",
    options: [
      "Repartition both tables by join key",
      "Use a broadcast join (broadcast hint on small table)",
      "Increase the number of executors",
      "Enable adaptive query execution only"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Repartition causa shuffle massivo da tabela grande — caro e lento.",
      "CORRETO! Broadcast join envia a tabela pequena para todos os executores, eliminando shuffle. Padrão clássico de otimização Spark para join small+large.",
      "ERRADO. Mais executores ajudam, mas sem broadcast o join continua com shuffle desnecessário.",
      "ERRADO. AQE ajuda, mas broadcast hint manual é mais determinístico para esse cenário."
    ]
  },
  {
    id: 17, domain: 1,
    en: "A team uses AWS Glue with PySpark and needs to invoke a custom Python library distributed across all worker nodes. How should they package this dependency?",
    pt: "Equipe usa Glue PySpark com biblioteca Python customizada distribuída entre workers. Como empacotar?",
    options: [
      "Upload the library to S3 and reference it via --extra-py-files job parameter",
      "Install via pip on the master node only",
      "Add to PYTHONPATH manually in the script",
      "Use Lambda Layers for Glue"
    ],
    correct: 0,
    explanations: [
      "CORRETO! --extra-py-files (ou --additional-python-modules) distribui pacotes Python (.whl, .zip, .egg) para todos os workers Glue automaticamente.",
      "ERRADO. Não há 'master node' no Glue serverless — a biblioteca precisa estar disponível em todos workers.",
      "ERRADO. PYTHONPATH manual não distribui para workers em modo distribuído.",
      "ERRADO. Lambda Layers são para Lambda, não para Glue."
    ]
  },
  {
    id: 18, domain: 1,
    en: "A data engineer is building a pipeline that ingests data from Amazon RDS into an S3 data lake. They need to handle schema changes automatically. Which approach is BEST?",
    pt: "Engenheiro constrói pipeline RDS → data lake S3, precisa lidar com mudanças de schema automaticamente. Qual MELHOR abordagem?",
    options: [
      "Manually update the Glue Data Catalog after each schema change",
      "Use AWS Glue Crawler with 'update the table definition' configured to detect changes",
      "Recreate the entire table on every load",
      "Use rigid schema validation that rejects unknown columns"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Atualização manual não escala e introduz erros operacionais.",
      "CORRETO! Glue Crawler detecta mudanças de schema (novas colunas, tipos) e atualiza o Data Catalog automaticamente.",
      "ERRADO. Recriar a tabela perde histórico de partições e configurações.",
      "ERRADO. Rejeitar colunas novas quebra o pipeline quando schema evolui."
    ]
  },
  {
    id: 19, domain: 1,
    en: "A company processes 50 GB of compressed JSON files in S3 daily and converts them to columnar format for analytics. Which approach is MOST cost-effective?",
    pt: "Empresa processa 50 GB diários de JSON comprimido em S3, convertendo para formato colunar para analytics. Abordagem MAIS econômica?",
    options: [
      "Use AWS Glue ETL job with G.1X workers and Parquet output",
      "Use Amazon EMR with persistent cluster running Spark",
      "Use AWS Lambda with Pandas to convert files",
      "Use Athena CTAS to write Parquet output"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Glue ETL é mais caro que Athena para esse volume — Glue cobra por DPU-hora.",
      "ERRADO. EMR persistente é caro para job diário de 50 GB. Cluster ocioso entre jobs gera custos.",
      "ERRADO. Lambda tem limite de 15min e 10GB memória; Pandas em GB de dados é arriscado.",
      "CORRETO! Athena CTAS é serverless, cobra apenas por dados escaneados, e converte para Parquet nativamente. Mais econômico para esse volume."
    ]
  },
  {
    id: 20, domain: 1,
    en: "A data engineer needs to debug a failed Glue ETL job. The job logs show 'Out of Memory' errors. Which actions should they take? (Select TWO)",
    pt: "Engenheiro debug Glue ETL falhou com 'Out of Memory'. Quais ações tomar? (Selecione DUAS)",
    options: [
      "Switch to G.2X or G.4X worker type for more memory (CORRETO)",
      "Reduce partitions to lower memory pressure",
      "Enable job bookmarks",
      "Persist intermediate DataFrames using df.cache() to disk (CORRETO)",
      "Increase the timeout"
    ],
    correct: 0,
    explanations: [
      "CORRETO! G.2X tem 32 GB e G.4X tem 64 GB de memória por worker (vs 16 GB do G.1X). Resolve OOM em workloads pesados.",
      "ERRADO. Reduzir partições aumenta dados por executor, piorando OOM.",
      "ERRADO. Bookmarks rastreiam dados processados, não aliviam memória.",
      "CORRETO! Cache em disco (StorageLevel.DISK_ONLY ou MEMORY_AND_DISK) move dados para disco quando memória esgota.",
      "ERRADO. Timeout não resolve OOM — só permite rodar mais tempo antes de falhar."
    ]
  },
  {
    id: 21, domain: 1,
    en: "A company uses Amazon Kinesis Data Firehose to deliver records to S3. They want to dynamically partition records by 'eventDate' field extracted from each record. Which feature should they enable?",
    pt: "Empresa usa Kinesis Data Firehose entregando para S3. Quer particionar dinamicamente por campo 'eventDate' de cada registro. Qual feature ativar?",
    options: [
      "Lambda transformation only",
      "Dynamic partitioning with inline parsing",
      "S3 Event Notifications with Lambda",
      "Manual partition keys in Firehose configuration"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Lambda transformation pode transformar dados, mas dynamic partitioning é a feature dedicada.",
      "CORRETO! Dynamic partitioning com inline parsing extrai campos JSON e particiona o S3 path automaticamente (ex: year=2024/month=01/day=15/).",
      "ERRADO. Event Notifications são para reagir a objetos criados, não para particionar a entrega.",
      "ERRADO. 'Manual partition keys' não é uma feature do Firehose."
    ]
  },
  {
    id: 22, domain: 1,
    en: "A real-time fraud detection pipeline must process events with <1 second latency. Which service combination provides the LOWEST latency?",
    pt: "Pipeline detecção fraude real-time com <1s latência. Qual combinação tem MENOR latência?",
    options: [
      "Kinesis Data Firehose → Lambda → DynamoDB",
      "Kinesis Data Streams with KCL consumers and DynamoDB",
      "S3 batch processing with Glue every minute",
      "SQS Standard with Lambda triggers"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Firehose tem buffer mínimo de 60s — não atende <1s.",
      "CORRETO! Kinesis Data Streams + KCL processam em milissegundos. DynamoDB tem latência single-digit ms. Total <1s.",
      "ERRADO. Batch a cada minuto = 60s de latência mínima.",
      "ERRADO. SQS Standard tem latência variável; não é otimizado para <1s consistente."
    ]
  },

  // ===== DOMAIN 2: Data Store Management =====
  {
    id: 23, domain: 2,
    en: "A data engineer needs to set up a data warehouse for ad-hoc queries with no consistent compute requirement. Which Redshift option is MOST cost-effective?",
    pt: "Engenheiro precisa data warehouse para queries ad-hoc sem requisito de compute consistente. Qual opção Redshift MAIS econômica?",
    options: [
      "Redshift provisioned with RA3 nodes",
      "Redshift Serverless",
      "Redshift with reserved instances",
      "Redshift with DC2 dense compute"
    ],
    correct: 1,
    explanations: [
      "ERRADO. RA3 provisioned cobra cluster 24/7 mesmo sem uso — caro para workload intermitente.",
      "CORRETO! Redshift Serverless escala automaticamente e cobra apenas pelo uso (RPU-hours), ideal para workloads ad-hoc/imprevisíveis.",
      "ERRADO. Reserved instances exigem compromisso 1-3 anos, não recomendado para uso esporádico.",
      "ERRADO. DC2 é nó dense compute legado; provisioned ainda cobra 24/7."
    ]
  },
  {
    id: 24, domain: 2,
    en: "A company stores time-series sensor data in DynamoDB. They need to delete records older than 30 days automatically and stream the deletions to a Lambda for archival. Which combination is BEST?",
    pt: "Empresa armazena time-series sensores em DynamoDB. Precisa excluir registros >30 dias automaticamente e streamar exclusões para Lambda para archival. Combinação MELHOR?",
    options: [
      "DynamoDB TTL + DynamoDB Streams + Lambda",
      "Lambda scheduled to scan and delete + Kinesis",
      "Glue job daily delete + EventBridge",
      "DynamoDB Global Tables + cross-region replication"
    ],
    correct: 0,
    explanations: [
      "CORRETO! TTL exclui automaticamente. Streams capturam DELETE events (com REMOVE no eventName). Lambda processa para archival. Solução totalmente gerenciada.",
      "ERRADO. Scan + delete é caro e ineficiente (consome RCU/WCU desnecessariamente).",
      "ERRADO. Glue job para delete em DynamoDB é overkill e mais caro que TTL nativo.",
      "ERRADO. Global Tables replicam dados, não excluem por idade."
    ]
  },
  {
    id: 25, domain: 2,
    en: "A data engineer needs to share a Redshift dataset across multiple AWS accounts WITHOUT physically copying the data. Which feature should be used?",
    pt: "Engenheiro precisa compartilhar dataset Redshift entre múltiplas contas AWS SEM copiar dados. Qual feature usar?",
    options: [
      "Redshift snapshots shared across accounts",
      "Redshift data sharing (datashares)",
      "Redshift COPY/UNLOAD between clusters",
      "AWS DataSync between Redshift clusters"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Snapshots criam cópia física do cluster — duplica armazenamento.",
      "CORRETO! Datashares permitem queries cross-account/cross-region em RA3 sem copiar dados. Producer cluster compartilha objects com consumer clusters em tempo real.",
      "ERRADO. UNLOAD/COPY copia fisicamente — duplicação de dados.",
      "ERRADO. DataSync é para arquivos, não para Redshift."
    ]
  },
  {
    id: 26, domain: 2,
    en: "A company has Athena queries that frequently filter on date ranges. The S3 data is partitioned by year/month/day. Which Athena feature reduces partition discovery overhead for thousands of partitions?",
    pt: "Empresa com queries Athena filtrando por data. S3 particionado year/month/day. Qual feature Athena reduz overhead de descoberta para milhares de partições?",
    options: [
      "MSCK REPAIR TABLE",
      "Partition projection",
      "Glue Crawler scheduled daily",
      "Athena Workgroups with cost limits"
    ],
    correct: 1,
    explanations: [
      "ERRADO. MSCK REPAIR popula partições no catálogo, mas Athena ainda lista milhares no metastore.",
      "CORRETO! Partition projection calcula partições com base em propriedades configuradas (range, integer, date), evitando lookup no Glue Catalog. Reduz tempo de planejamento drasticamente.",
      "ERRADO. Crawlers ajudam a descobrir, mas não eliminam o overhead de listar milhares no metastore.",
      "ERRADO. Workgroups gerenciam custos/queries, não otimizam descoberta de partições."
    ]
  },
  {
    id: 27, domain: 2,
    en: "A data engineer needs to query data from an RDS PostgreSQL database directly from Amazon Redshift WITHOUT loading the data. Which feature should they use?",
    pt: "Engenheiro precisa consultar dados RDS PostgreSQL direto do Redshift SEM carregar. Qual feature?",
    options: [
      "Redshift Spectrum",
      "Redshift Federated Query",
      "Redshift COPY command",
      "Redshift Data Sharing"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Spectrum consulta S3, não RDS.",
      "CORRETO! Federated Query permite Redshift consultar dados em RDS PostgreSQL/MySQL e Aurora sem carregar — ideal para enriquecer queries com dados operacionais.",
      "ERRADO. COPY carrega dados, não consulta sem carregar.",
      "ERRADO. Data Sharing é entre clusters Redshift, não para RDS."
    ]
  },
  {
    id: 28, domain: 2,
    en: "A company uses DynamoDB for a high-traffic application with read-heavy access patterns. They want microsecond response times for reads. Which feature should be enabled?",
    pt: "Empresa usa DynamoDB com tráfego alto, padrão read-heavy. Querem leituras com microsegundos. Qual feature ativar?",
    options: [
      "DynamoDB Streams",
      "DynamoDB Accelerator (DAX)",
      "DynamoDB Global Secondary Index",
      "DynamoDB on-demand mode"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Streams capturam mudanças, não aceleram leituras.",
      "CORRETO! DAX é cache em memória totalmente gerenciado para DynamoDB, com leituras em microsegundos (vs single-digit ms do DynamoDB).",
      "ERRADO. GSI cria índices alternativos, não acelera leituras gerais.",
      "ERRADO. On-demand muda billing, não acelera para microsegundos."
    ]
  },
  {
    id: 29, domain: 2,
    en: "A data engineer is designing a Redshift cluster. The largest table has 10 billion rows and is queried with date range filters and joined with smaller dimensions. Which design is BEST?",
    pt: "Engenheiro projeta cluster Redshift. Maior tabela 10 bilhões linhas, queries com filtro por data + join com dimensões pequenas. Design MELHOR?",
    options: [
      "DISTSTYLE EVEN, no SORTKEY",
      "DISTSTYLE KEY on date column, SORTKEY on date column",
      "DISTSTYLE KEY on join column, SORTKEY on date column",
      "DISTSTYLE ALL on fact table"
    ],
    correct: 2,
    explanations: [
      "ERRADO. EVEN distribui aleatoriamente — joins exigirão shuffle massivo.",
      "ERRADO. DISTKEY em data causa skew (datas recentes ficam em poucos nodes).",
      "CORRETO! DISTKEY na coluna de join elimina shuffle. SORTKEY em data permite zone maps eliminarem blocos não relevantes nos filtros.",
      "ERRADO. DISTSTYLE ALL replica em todos os nodes — inviável para tabela de 10B linhas."
    ]
  },
  {
    id: 30, domain: 2,
    en: "A company stores critical financial data in S3. They need to ensure objects cannot be deleted or modified for 7 years for regulatory compliance. Which S3 feature provides this?",
    pt: "Empresa armazena dados financeiros críticos em S3. Precisa garantir que objetos não sejam excluídos/modificados por 7 anos por compliance. Qual feature S3?",
    options: [
      "S3 Versioning",
      "S3 Object Lock with Compliance retention",
      "S3 Lifecycle policy with expiration",
      "S3 Bucket Policy with deny delete"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Versioning preserva versões antigas, mas não impede delete por root user.",
      "CORRETO! Object Lock em modo Compliance impede QUALQUER usuário (até root) de excluir/modificar objetos durante o período de retenção (até anos). Atende WORM compliance regulatório.",
      "ERRADO. Lifecycle expira/exclui, oposto do que se pede.",
      "ERRADO. Bucket policies podem ser modificadas; não atendem WORM regulatório."
    ]
  },
  {
    id: 31, domain: 2,
    en: "A data engineer needs to migrate from DynamoDB to a relational schema in Amazon RDS for complex JOIN queries. Which AWS service helps automate this migration?",
    pt: "Engenheiro precisa migrar DynamoDB para schema relacional em RDS para JOINs complexos. Qual serviço AWS automatiza?",
    options: [
      "AWS DMS with DynamoDB source and RDS target",
      "AWS Glue with DynamoDB connector",
      "AWS DataSync from DynamoDB to RDS",
      "Amazon AppFlow with DynamoDB connection"
    ],
    correct: 0,
    explanations: [
      "CORRETO! DMS suporta DynamoDB como source e RDS como target. Mapeia documentos NoSQL para tabelas relacionais com configuração de table mapping.",
      "ERRADO. Glue pode ler DynamoDB, mas DMS é a ferramenta dedicada para migração de bancos com schema mapping.",
      "ERRADO. DataSync é para arquivos/storage, não bancos de dados.",
      "ERRADO. AppFlow não tem conector para DynamoDB como source para RDS."
    ]
  },
  {
    id: 32, domain: 2,
    en: "A company uses Athena to query data lake data. Queries are frequently rerun with the same parameters. Which feature reduces costs for repeated queries?",
    pt: "Empresa usa Athena em data lake. Queries são repetidas com mesmos parâmetros. Qual feature reduz custos para queries repetidas?",
    options: [
      "Athena query result reuse (caching)",
      "Athena workgroups with limits",
      "Athena Federated Query",
      "Athena CTAS"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Athena Query Result Reuse cacheia resultados por até 7 dias. Queries idênticas retornam o cache sem reescaneamento — custo zero de scan.",
      "ERRADO. Workgroups limitam custos via quotas, não cacheiam resultados.",
      "ERRADO. Federated Query é para fontes externas, não otimiza queries repetidas.",
      "ERRADO. CTAS cria tabelas, não cacheia automaticamente."
    ]
  },
  {
    id: 33, domain: 2,
    en: "A data engineer needs to enforce ACID transactions on a data lake stored in S3 with concurrent writes from multiple Glue jobs. Which table format supports this?",
    pt: "Engenheiro precisa transações ACID em data lake S3 com escritas concorrentes de múltiplos Glue jobs. Qual formato suporta?",
    options: [
      "Plain Parquet files",
      "Apache Iceberg tables",
      "CSV with Glue catalog",
      "JSON with manifest files"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Parquet puro não suporta ACID — escritas concorrentes podem corromper dados.",
      "CORRETO! Iceberg fornece transações ACID, schema evolution, time travel, e suporta concurrent writes via optimistic concurrency. Suportado nativamente em Athena/Glue/EMR.",
      "ERRADO. CSV é texto, não suporta ACID.",
      "ERRADO. JSON com manifests não fornece ACID transactions."
    ]
  },
  {
    id: 34, domain: 2,
    en: "A company runs OLTP workloads on Aurora MySQL. They need to perform complex analytics WITHOUT impacting production performance. Which is the BEST approach?",
    pt: "Empresa roda OLTP em Aurora MySQL. Precisa analytics complexa SEM impactar produção. MELHOR abordagem?",
    options: [
      "Run analytics on the same Aurora primary instance",
      "Use Aurora zero-ETL integration with Amazon Redshift",
      "Take daily snapshots and restore to a separate cluster",
      "Use Aurora replicas as the analytics target without setup"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Analytics no primary impacta OLTP — exatamente o que se quer evitar.",
      "CORRETO! Aurora zero-ETL replica continuamente para Redshift sem código ETL. Analytics roda em Redshift sem impactar Aurora.",
      "ERRADO. Snapshots diários têm dados desatualizados em até 24h e overhead operacional.",
      "ERRADO. Replicas Aurora compartilham storage; queries pesadas ainda impactam o cluster."
    ]
  },
  {
    id: 35, domain: 2,
    en: "A data engineer needs precomputed query results in Redshift that are automatically refreshed when underlying data changes. Which feature should they use?",
    pt: "Engenheiro precisa resultados pré-computados em Redshift atualizados automaticamente. Qual feature?",
    options: [
      "Standard views",
      "Materialized views with auto-refresh",
      "CTAS tables",
      "External tables"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Standard views recomputam a query a cada execução — sem precomputação.",
      "CORRETO! Materialized views armazenam resultados pré-computados. Auto-refresh detecta mudanças nas tabelas base e atualiza incrementalmente quando possível.",
      "ERRADO. CTAS cria tabela estática que não se atualiza com mudanças.",
      "ERRADO. External tables apontam para S3, não armazenam pré-computações."
    ]
  },
  {
    id: 36, domain: 2,
    en: "A company has petabytes of data in S3 with diverse access patterns: some accessed daily, others rarely. They want automatic optimization without analysis. Which storage class is BEST?",
    pt: "Empresa com petabytes em S3 e padrões variados de acesso. Querem otimização automática sem análise. Storage class MELHOR?",
    options: [
      "S3 Standard for everything",
      "S3 Intelligent-Tiering",
      "S3 Standard-IA for everything",
      "S3 One Zone-IA"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Standard cobra premium por dados raramente acessados — desperdício.",
      "CORRETO! Intelligent-Tiering monitora e move objetos automaticamente entre tiers (Frequent, Infrequent, Archive Instant, Archive, Deep Archive) sem retrieval fees. Ideal quando padrões variam.",
      "ERRADO. Standard-IA cobra retrieval fees para acesso frequente — sai caro para dados frequentes.",
      "ERRADO. One Zone-IA tem menos durabilidade (1 AZ); arriscado para dados críticos."
    ]
  },
  {
    id: 37, domain: 2,
    en: "A data engineer needs to perform efficient point-in-time recovery for a critical OLTP database. The RPO is 5 minutes. Which database/feature combination meets this?",
    pt: "Engenheiro precisa point-in-time recovery eficiente para OLTP crítico. RPO = 5 minutos. Qual banco/feature atende?",
    options: [
      "Amazon Aurora with backtrack",
      "Amazon RDS with automated backups",
      "DynamoDB with PITR (Point-In-Time Recovery)",
      "Amazon S3 with versioning"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Aurora backtrack tem janela limitada (até 72h) e é específico ao Aurora MySQL.",
      "CORRETO! RDS automated backups + transaction logs permitem restore para qualquer segundo dentro do período de retenção. Atende RPO de 5 min com backups frequentes.",
      "ERRADO. DynamoDB PITR atende, mas a questão diz 'OLTP database' geralmente referindo a relacional. Aurora/RDS são padrão.",
      "ERRADO. S3 não é banco OLTP."
    ]
  },
  {
    id: 38, domain: 2,
    en: "A company stores log files (avg 10 KB each) and runs Athena queries on them. Many small files cause poor query performance. Which solution should they implement?",
    pt: "Empresa com log files (10 KB cada) e queries Athena. Muitos arquivos pequenos causam performance ruim. Qual solução?",
    options: [
      "Use Glue to compact small files into larger Parquet files",
      "Increase Athena query timeout",
      "Add more partitions",
      "Switch to S3 Standard-IA"
    ],
    correct: 0,
    explanations: [
      "CORRETO! 'Small files problem' degrada performance. Compaction agrupa arquivos em Parquet de 128MB-1GB, reduzindo overhead de listagem/leitura. Athena/Glue ETL fazem isso eficientemente.",
      "ERRADO. Aumentar timeout não resolve o problema, só permite query lenta rodar mais.",
      "ERRADO. Mais partições agravam o problema se cada uma tiver muitos arquivos pequenos.",
      "ERRADO. Storage class não afeta performance de query."
    ]
  },
  {
    id: 39, domain: 2,
    en: "A data engineer needs to enforce row-level security in a data lake — different users see different rows of the same table based on their region. Which service provides this BEST?",
    pt: "Engenheiro precisa row-level security em data lake — usuários veem linhas diferentes da mesma tabela por região. Melhor serviço?",
    options: [
      "Amazon S3 Bucket Policies",
      "AWS Lake Formation Data Filters with row filters",
      "IAM policies with conditions",
      "Glue Data Catalog tags"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Bucket policies controlam acesso a objetos S3 inteiros, não a linhas dentro de arquivos.",
      "CORRETO! Lake Formation Data Filters fornecem row-level e cell-level security. Filtros tipo 'region = ${current_user.region}' aplicam-se transparentemente em queries Athena/Redshift Spectrum.",
      "ERRADO. IAM policies não filtram linhas dentro de tabelas analíticas.",
      "ERRADO. Tags categorizam recursos, não filtram linhas."
    ]
  },

  // ===== DOMAIN 3: Data Operations and Support =====
  {
    id: 40, domain: 3,
    en: "A data engineer needs to monitor an AWS Glue ETL job and receive alerts when it fails. Which combination is MOST efficient?",
    pt: "Engenheiro monitora Glue ETL e quer alertas em falhas. Combinação MAIS eficiente?",
    options: [
      "EventBridge rule on Glue Job State Change → SNS topic",
      "CloudWatch Logs subscription filter → Lambda",
      "Daily scheduled Lambda to query Glue API",
      "X-Ray tracing on Glue jobs"
    ],
    correct: 0,
    explanations: [
      "CORRETO! EventBridge captura eventos de Glue (FAILED, SUCCEEDED, TIMEOUT). Roteia para SNS para email/SMS. Sem código, near real-time, gerenciado.",
      "ERRADO. Subscription filter requer parsing de logs e lógica customizada — mais complexo.",
      "ERRADO. Polling diário tem latência alta — não é eficiente para alertas.",
      "ERRADO. X-Ray faz tracing distribuído, não é para alertas de falha."
    ]
  },
  {
    id: 41, domain: 3,
    en: "A team uses Amazon QuickSight for business dashboards. Performance is slow when querying large Athena datasets. Which QuickSight feature improves performance?",
    pt: "Equipe usa QuickSight com Athena em datasets grandes, performance lenta. Qual feature QuickSight melhora?",
    options: [
      "Use direct query mode only",
      "Import data into SPICE (Super-fast, Parallel, In-memory Calculation Engine)",
      "Reduce dashboard refresh frequency",
      "Switch to Amazon Athena Federated Query"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Direct query roda Athena toda vez — exatamente o que está lento.",
      "CORRETO! SPICE é engine in-memory do QuickSight. Importa dados uma vez, queries aceleram drasticamente. Refresh agendado mantém dados atualizados.",
      "ERRADO. Reduzir refresh não acelera queries individuais.",
      "ERRADO. Federated Query é Athena feature, não QuickSight performance."
    ]
  },
  {
    id: 42, domain: 3,
    en: "A data engineer notices that an EMR cluster is over-provisioned for current workloads. Which feature can dynamically adjust capacity to reduce costs?",
    pt: "Engenheiro nota cluster EMR over-provisioned. Qual feature ajusta capacidade dinamicamente para reduzir custos?",
    options: [
      "EMR Managed Scaling",
      "EMR Instance Fleets only",
      "EMR Reserved Instances",
      "EMR Spot Blocks"
    ],
    correct: 0,
    explanations: [
      "CORRETO! EMR Managed Scaling adiciona/remove nodes automaticamente baseado em métricas YARN/HDFS. Reduz custo em workloads variáveis.",
      "ERRADO. Instance Fleets é configuração de tipos de instância, não autoscaling automático per se.",
      "ERRADO. Reserved Instances é commitment 1-3 anos, não adapta dinamicamente.",
      "ERRADO. Spot Blocks foram descontinuados pela AWS."
    ]
  },
  {
    id: 43, domain: 3,
    en: "A data engineer wants to track and compare costs of different data pipelines (Glue, EMR, Athena, Redshift). Which AWS feature provides cost allocation by service?",
    pt: "Engenheiro quer rastrear e comparar custos de pipelines (Glue, EMR, Athena, Redshift). Qual feature AWS aloca custo por serviço?",
    options: [
      "AWS Cost Allocation Tags + Cost Explorer",
      "AWS Budgets only",
      "Amazon CloudWatch billing dashboard",
      "AWS Trusted Advisor"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Cost Allocation Tags marcam recursos por pipeline/projeto. Cost Explorer visualiza custos agrupados por tag — permite comparar custo de pipelines independentemente do serviço.",
      "ERRADO. Budgets alerta sobre limites, não compara custos detalhadamente.",
      "ERRADO. CloudWatch billing mostra agregação básica, sem granularidade por tag.",
      "ERRADO. Trusted Advisor sugere otimizações, não rastreia custo por pipeline."
    ]
  },
  {
    id: 44, domain: 3,
    en: "A Redshift cluster is showing high disk usage warnings. Which approach addresses this WITHOUT adding nodes?",
    pt: "Cluster Redshift mostra alertas de disk usage alto. Qual abordagem resolve SEM adicionar nodes?",
    options: [
      "Run VACUUM and ANALYZE on tables",
      "Migrate from RA3 to DC2",
      "Disable column compression",
      "Add more sort keys"
    ],
    correct: 0,
    explanations: [
      "CORRETO! VACUUM recupera espaço de linhas marcadas como deletadas e reorganiza dados por sortkey. ANALYZE atualiza estatísticas. Recupera espaço sem nodes adicionais.",
      "ERRADO. Migrar de RA3 (managed storage) para DC2 piora — DC2 tem storage limitado por node.",
      "ERRADO. Desabilitar compressão AUMENTA uso de disco.",
      "ERRADO. Sort keys reorganizam dados, mas não recuperam espaço por si só."
    ]
  },
  {
    id: 45, domain: 3,
    en: "A data engineer needs to set automatic scaling for a Redshift cluster to handle peak query loads. Which Redshift feature should they enable?",
    pt: "Engenheiro precisa autoscaling Redshift para picos de query. Qual feature ativar?",
    options: [
      "Concurrency Scaling",
      "Manual cluster resize",
      "Workload Management with static allocation",
      "Redshift Spectrum"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Concurrency Scaling adiciona clusters transparentes durante picos. 1h de uso por dia é gratuita por cluster principal. Pago apenas pelo que excede.",
      "ERRADO. Manual resize requer downtime e intervenção, não autoscaling.",
      "ERRADO. WLM estático aloca recursos fixos, sem escalar.",
      "ERRADO. Spectrum consulta S3, não escala compute do cluster."
    ]
  },
  {
    id: 46, domain: 3,
    en: "A team needs to debug performance issues in a serverless data pipeline using Lambda, Step Functions, and SQS. Which AWS service provides distributed tracing?",
    pt: "Equipe debug performance em pipeline serverless (Lambda, Step Functions, SQS). Qual serviço AWS faz tracing distribuído?",
    options: [
      "AWS X-Ray",
      "Amazon CloudWatch Logs",
      "AWS CloudTrail",
      "Amazon EventBridge"
    ],
    correct: 0,
    explanations: [
      "CORRETO! X-Ray rastreia requisições através de Lambda, Step Functions, SQS, API Gateway, etc. Identifica gargalos com mapas de serviço e traces detalhados.",
      "ERRADO. CloudWatch Logs mostra logs, mas não correlaciona traces entre serviços.",
      "ERRADO. CloudTrail audita chamadas de API, não rastreia performance.",
      "ERRADO. EventBridge é bus de eventos, não tracer."
    ]
  },
  {
    id: 47, domain: 3,
    en: "A data pipeline writes to S3 nightly. The data team needs to validate data quality (completeness, uniqueness, freshness) before downstream consumption. Which service automates this BEST?",
    pt: "Pipeline escreve em S3 diariamente. Equipe precisa validar qualidade (completude, unicidade, freshness) antes de consumo downstream. Qual serviço automatiza?",
    options: [
      "AWS Glue Data Quality with Data Quality Definition Language (DQDL)",
      "AWS Lambda with custom validation scripts",
      "Manual checks via SQL queries",
      "AWS Config rules"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Glue Data Quality (powered by Deequ) tem DQDL declarativa para regras (Completeness, Uniqueness, Freshness). Integra com Glue ETL e Data Catalog. Sem código.",
      "ERRADO. Lambda customizada exige código e manutenção; Glue Data Quality oferece o mesmo declarativamente.",
      "ERRADO. Manual não escala nem automatiza.",
      "ERRADO. AWS Config audita configuração de recursos AWS, não conteúdo de dados."
    ]
  },
  {
    id: 48, domain: 3,
    en: "An Athena query takes 30 minutes and the user gets a timeout error. What is the MOST likely cause and solution?",
    pt: "Query Athena demora 30min e usuário recebe timeout. Causa mais provável e solução?",
    options: [
      "Athena has 30-min default DML timeout; rewrite query or use partitioning",
      "Athena requires manual restart",
      "Use Athena Federated Query",
      "Switch to a smaller workgroup"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Athena tem timeout default ~30min para DML. Solução: otimizar query (filtros em colunas particionadas, formatos colunares como Parquet, usar projeção de partições, queries CTAS para resultados intermediários).",
      "ERRADO. Athena é serverless, não há 'restart'.",
      "ERRADO. Federated Query é para fontes externas, não acelera queries.",
      "ERRADO. Workgroups gerenciam quotas, não aumentam timeout."
    ]
  },
  {
    id: 49, domain: 3,
    en: "A data engineer needs to monitor Redshift cluster performance and identify slow queries. Which view/table provides query history and execution details?",
    pt: "Engenheiro monitora performance Redshift e identifica queries lentas. Qual view/table mostra histórico e detalhes de execução?",
    options: [
      "STL_QUERY and SVL_QUERY_REPORT",
      "INFORMATION_SCHEMA only",
      "CloudTrail data events",
      "S3 access logs"
    ],
    correct: 0,
    explanations: [
      "CORRETO! STL_QUERY (histórico) e SVL_QUERY_REPORT/SVL_QUERY_SUMMARY (estatísticas detalhadas) mostram queries, tempo, etapas, e gargalos. Tabelas de sistema do Redshift.",
      "ERRADO. INFORMATION_SCHEMA tem metadados de schema, não execução de queries.",
      "ERRADO. CloudTrail audita API, não captura SQL executado.",
      "ERRADO. S3 access logs são para S3, não Redshift."
    ]
  },
  {
    id: 50, domain: 3,
    en: "A team observes Glue jobs occasionally failing due to AWS service throttling. Which approach should they implement to handle transient errors?",
    pt: "Equipe observa Glue jobs falhando esporadicamente por throttling AWS. Qual abordagem para erros transientes?",
    options: [
      "Configure Glue job retry with exponential backoff",
      "Switch all jobs to bookmarks",
      "Increase the timeout parameter",
      "Convert to EMR cluster"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Glue jobs têm parâmetro de retry (até 10 tentativas) com backoff. Resolve falhas transientes (throttling, network). Configuração simples no job.",
      "ERRADO. Bookmarks evitam reprocessamento, não tratam falhas transientes.",
      "ERRADO. Timeout não corrige falhas — só dá mais tempo antes de falhar.",
      "ERRADO. Mudar para EMR é over-engineering para tratar throttling."
    ]
  },
  {
    id: 51, domain: 3,
    en: "A company's S3 access patterns vary wildly. They want a tool that recommends storage class transitions automatically based on actual access. Which feature provides this?",
    pt: "Padrões de acesso S3 variam. Querem ferramenta que recomenda transições de storage automaticamente. Qual feature?",
    options: [
      "S3 Storage Lens with recommendations",
      "S3 Access Logs only",
      "S3 Inventory reports",
      "S3 Replication metrics"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Storage Lens analisa uso de S3 cross-account/cross-region e fornece recomendações de cost optimization (transições, lifecycle, anomalias).",
      "ERRADO. Access Logs registram requests, mas não fazem recomendações.",
      "ERRADO. Inventory lista objetos, sem análise de padrões.",
      "ERRADO. Replication metrics monitoram replicação, não otimização."
    ]
  },
  {
    id: 52, domain: 3,
    en: "A data engineer needs to deploy infrastructure for data pipelines repeatedly across dev/staging/prod environments. Which AWS service provides Infrastructure-as-Code with native CloudFormation integration?",
    pt: "Engenheiro precisa deploy de infra para pipelines em dev/staging/prod. Qual serviço fornece IaC com integração CloudFormation nativa?",
    options: [
      "AWS CDK (Cloud Development Kit)",
      "AWS Service Catalog only",
      "AWS Lambda",
      "AWS Systems Manager"
    ],
    correct: 0,
    explanations: [
      "CORRETO! CDK permite definir infra em linguagens (Python, TypeScript, Java) e sintetiza em CloudFormation. Reusabilidade, testes unitários, deploy multi-ambiente.",
      "ERRADO. Service Catalog é para gerenciar produtos aprovados, não IaC primário.",
      "ERRADO. Lambda é compute serverless, não IaC.",
      "ERRADO. Systems Manager é para operações em fleet de instâncias, não IaC."
    ]
  },
  {
    id: 53, domain: 3,
    en: "A team running an EMR cluster wants to integrate it with the AWS Glue Data Catalog as the metastore for Hive and Spark. Which configuration is required?",
    pt: "Equipe com EMR quer integrar com Glue Data Catalog como metastore para Hive/Spark. Qual configuração?",
    options: [
      "Set hive.metastore.client.factory.class to AWSGlueDataCatalogHiveClientFactory in EMR config",
      "Use AWS Lambda to sync catalogs",
      "Use Athena instead of EMR",
      "Use AWS DMS"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Configuração 'AWSGlueDataCatalogHiveClientFactory' substitui Hive metastore local pelo Glue Data Catalog. EMR + Spark/Hive usam o catálogo unificado da AWS.",
      "ERRADO. Lambda sync é solução customizada complexa — Glue integration é nativa.",
      "ERRADO. Athena é serviço diferente, não substitui EMR.",
      "ERRADO. DMS é para migração de bancos, não para metastore."
    ]
  },

  // ===== DOMAIN 4: Data Security and Governance =====
  {
    id: 54, domain: 4,
    en: "A data engineer needs to encrypt S3 data at rest with keys that are rotated automatically and managed by AWS. Which encryption option fits BEST?",
    pt: "Engenheiro precisa criptografar S3 at rest com chaves rotacionadas automaticamente e gerenciadas pela AWS. Qual opção MELHOR?",
    options: [
      "SSE-S3 (AES-256 with S3-managed keys)",
      "SSE-KMS with AWS-managed key (aws/s3)",
      "SSE-C with customer-provided keys",
      "Client-side encryption only"
    ],
    correct: 1,
    explanations: [
      "ERRADO. SSE-S3 não permite auditoria/visualização de uso da chave em CloudTrail.",
      "CORRETO! SSE-KMS com aws/s3 (AWS-managed key) rotaciona automaticamente, é gerenciada pela AWS, e fornece auditoria via CloudTrail. Custo zero pela chave (custo só por chamadas KMS).",
      "ERRADO. SSE-C exige cliente gerenciar/enviar chaves a cada request — alta complexidade.",
      "ERRADO. Client-side encryption requer gerenciamento adicional, não 'gerenciada pela AWS'."
    ]
  },
  {
    id: 55, domain: 4,
    en: "A company needs to grant a third-party vendor read access to specific S3 prefixes WITHOUT sharing IAM credentials. Which feature is BEST?",
    pt: "Empresa precisa conceder acesso read a vendor em prefixes S3 SEM compartilhar credenciais IAM. Qual feature?",
    options: [
      "S3 presigned URLs",
      "Cross-account IAM role with trust policy",
      "S3 Access Points with policies",
      "Bucket policy with vendor IP whitelist"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Presigned URLs são para acesso temporário a objetos individuais, não para acesso contínuo a prefixes.",
      "CORRETO! Cross-account IAM role com trust policy permite vendor assumir o role usando suas próprias credenciais. Vendor não recebe IAM credentials da empresa.",
      "ERRADO. Access Points com policies funcionam, mas IAM role cross-account é o padrão para acesso entre organizações.",
      "ERRADO. IP whitelist é frágil (IPs mudam) e não autentica usuários."
    ]
  },
  {
    id: 56, domain: 4,
    en: "A data engineer wants to detect sensitive data (PII, credit cards, SSNs) in S3 buckets automatically and continuously. Which service should they use?",
    pt: "Engenheiro quer detectar dados sensíveis (PII, cartões, SSN) em S3 automaticamente e continuamente. Qual serviço?",
    options: [
      "Amazon Macie",
      "AWS Config rules",
      "Amazon GuardDuty",
      "AWS Inspector"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Amazon Macie usa ML para descobrir PII e dados sensíveis em S3 continuamente. Findings vão para Security Hub/EventBridge.",
      "ERRADO. Config rules avaliam configuração de recursos AWS, não conteúdo de dados.",
      "ERRADO. GuardDuty detecta ameaças (compromised credentials, malware), não classifica dados.",
      "ERRADO. Inspector avalia vulnerabilidades de EC2/ECR, não dados em S3."
    ]
  },
  {
    id: 57, domain: 4,
    en: "A company needs to maintain an immutable audit log of all data access to a sensitive Redshift cluster. Which combination provides this?",
    pt: "Empresa precisa log de auditoria imutável de todo acesso a Redshift sensível. Qual combinação?",
    options: [
      "Redshift audit logging to S3 with Object Lock + CloudTrail",
      "CloudWatch Logs only",
      "VPC Flow Logs",
      "X-Ray traces"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Redshift audit logging captura connection log, user log e user activity log para S3. Object Lock impede modificação. CloudTrail audita ações de management API. Imutabilidade completa.",
      "ERRADO. CloudWatch Logs sem Object Lock não é imutável.",
      "ERRADO. VPC Flow Logs mostram tráfego de rede, não queries SQL.",
      "ERRADO. X-Ray rastreia performance, não auditoria."
    ]
  },
  {
    id: 58, domain: 4,
    en: "A data engineer wants to grant column-level access to specific users in a data lake table. Some users see all columns, others see only non-PII columns. Which service provides this?",
    pt: "Engenheiro quer conceder acesso column-level em tabela do data lake. Alguns usuários veem todas colunas, outros só não-PII. Qual serviço?",
    options: [
      "AWS Lake Formation with column-level permissions",
      "S3 bucket policies",
      "IAM with conditions",
      "Glue Data Catalog tags"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Lake Formation permite GRANT/REVOKE em colunas específicas. Athena/Redshift Spectrum aplicam o filtro automaticamente. Sem ETL ou views customizadas.",
      "ERRADO. Bucket policies controlam acesso a objetos, não colunas dentro de arquivos.",
      "ERRADO. IAM não tem granularidade column-level em data lake.",
      "ERRADO. Tags categorizam, não controlam acesso column-level."
    ]
  },
  {
    id: 59, domain: 4,
    en: "A company stores sensitive data with KMS-encrypted S3. They want to ensure that only specific applications can decrypt the data, even if S3 access is granted. Which approach should they use?",
    pt: "Empresa armazena dados sensíveis com KMS em S3. Quer garantir que só apps específicos descriptografem, mesmo com acesso S3 concedido. Qual abordagem?",
    options: [
      "Use KMS key policies to restrict kms:Decrypt to specific IAM principals/roles",
      "Use S3 bucket ACLs",
      "Use private bucket with VPC endpoint",
      "Disable IAM user passwords"
    ],
    correct: 0,
    explanations: [
      "CORRETO! KMS key policy controla quem pode usar a chave (kms:Decrypt). Mesmo com acesso ao S3, sem permissão na KMS o usuário não consegue descriptografar. Defense in depth.",
      "ERRADO. ACLs controlam acesso a objetos, não decryption.",
      "ERRADO. VPC endpoint controla rede, não permissões de descriptografia.",
      "ERRADO. Desabilitar senhas afeta autenticação geral, não criptografia específica."
    ]
  },
  {
    id: 60, domain: 4,
    en: "A regulated financial institution needs to log every API call to AWS services with multi-region coverage and tamper-proof storage for 7 years. Which configuration is BEST?",
    pt: "Instituição financeira precisa logar toda API call AWS multi-region com storage tamper-proof por 7 anos. Configuração MELHOR?",
    options: [
      "CloudTrail multi-region trail → S3 with Object Lock + Glacier lifecycle",
      "CloudWatch Logs only",
      "VPC Flow Logs",
      "AWS Config snapshots only"
    ],
    correct: 0,
    explanations: [
      "CORRETO! CloudTrail multi-region captura todas APIs em todas regiões. S3 com Object Lock = tamper-proof. Lifecycle para Glacier reduz custo de retenção de 7 anos.",
      "ERRADO. CloudWatch Logs sem Object Lock não é tamper-proof.",
      "ERRADO. VPC Flow Logs mostram rede, não API calls AWS.",
      "ERRADO. AWS Config foca em configuração, não em todas API calls."
    ]
  },
  {
    id: 61, domain: 4,
    en: "A data engineer must rotate database credentials used by an AWS Lambda function every 30 days automatically. Which service provides automatic credential rotation?",
    pt: "Engenheiro deve rotacionar credenciais de banco usadas por Lambda a cada 30 dias automaticamente. Qual serviço?",
    options: [
      "AWS Secrets Manager with automatic rotation",
      "AWS Systems Manager Parameter Store with cron",
      "AWS KMS",
      "Hard-coded in Lambda environment variables"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Secrets Manager rotaciona credenciais (RDS, Aurora, Redshift) automaticamente via Lambda rotation function gerenciada. Aplicações leem o secret atual sem alteração de código.",
      "ERRADO. Parameter Store armazena secrets, mas não tem rotação nativa automática.",
      "ERRADO. KMS gerencia chaves criptográficas, não credenciais de banco.",
      "ERRADO. Hard-coded em variáveis de ambiente é prática anti-segurança."
    ]
  },
  {
    id: 62, domain: 4,
    en: "A data engineer needs to ensure data in transit between an application and S3 is encrypted. Which mechanism enforces TLS for S3 access?",
    pt: "Engenheiro garante criptografia em trânsito entre app e S3. Qual mecanismo força TLS para acesso S3?",
    options: [
      "Bucket policy with condition aws:SecureTransport=true",
      "Enable S3 versioning",
      "Object Lock",
      "Bucket ACL"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Bucket policy com 'Condition: { Bool: { aws:SecureTransport: true } }' (deny if false) força HTTPS. Requests via HTTP são rejeitados.",
      "ERRADO. Versioning é para preservar versões, não TLS.",
      "ERRADO. Object Lock é WORM, não TLS.",
      "ERRADO. ACLs controlam acesso, não protocolo de transporte."
    ]
  },
  {
    id: 63, domain: 4,
    en: "A company uses AWS Lake Formation. They want to grant a Glue ETL job permissions to read a specific table without giving it broad S3 access. Which feature should they use?",
    pt: "Empresa usa Lake Formation. Quer conceder a Glue ETL acesso de leitura a tabela específica SEM acesso S3 amplo. Qual feature?",
    options: [
      "Lake Formation grants on the table to the Glue job's IAM role",
      "S3 bucket policy with allow",
      "Glue Data Catalog encryption",
      "VPC endpoint policy"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Lake Formation centraliza permissões em catalog objects (databases, tables, columns). GRANT SELECT na tabela ao role do Glue concede acesso fine-grained sem políticas S3 amplas.",
      "ERRADO. Bucket policy seria amplo, não fine-grained por tabela.",
      "ERRADO. Encryption protege dados, não controla acesso.",
      "ERRADO. VPC endpoint policy controla redes, não acesso a tabela específica."
    ]
  },
  {
    id: 64, domain: 4,
    en: "A data engineer needs to detect anomalous query behavior in Redshift (e.g., unusual data extraction patterns) for security monitoring. Which solution is BEST?",
    pt: "Engenheiro precisa detectar comportamento anômalo de queries em Redshift (ex: padrões incomuns de extração) para segurança. MELHOR solução?",
    options: [
      "Enable Redshift audit logging + analyze with CloudWatch Logs Insights or SIEM",
      "Use VPC Flow Logs",
      "Enable AWS Config rules",
      "Enable S3 Object Lock"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Redshift audit logging exporta user activity logs (queries SQL completas). Analisar via CloudWatch Logs Insights ou SIEM (Splunk, Datadog) detecta anomalias como SELECT massivos, queries fora de horário.",
      "ERRADO. VPC Flow Logs mostram conexões de rede, não SQL executado.",
      "ERRADO. Config audita configuração de recursos, não queries.",
      "ERRADO. Object Lock é para imutabilidade S3, não detecção de anomalias."
    ]
  },
  {
    id: 65, domain: 4,
    en: "A company wants to ensure GDPR compliance — when a user requests deletion, all their data must be removed from S3, Redshift, and DynamoDB. Which approach provides centralized governance?",
    pt: "Empresa quer compliance GDPR — quando usuário solicita exclusão, dados devem ser removidos de S3, Redshift, DynamoDB. Qual abordagem fornece governança centralizada?",
    options: [
      "Build a 'right-to-be-forgotten' workflow using Step Functions orchestrating deletions across services",
      "Manually delete records when requested",
      "Use AWS Backup to delete old backups",
      "Disable user accounts only"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Step Functions orquestra Lambda functions que executam DELETEs em S3 (com versioning suspended/object expiration), Redshift (DELETE FROM), DynamoDB (DeleteItem). Auditável, repetível, atende GDPR Art. 17.",
      "ERRADO. Manual não é escalável e propenso a esquecimentos — risco de compliance.",
      "ERRADO. Excluir backups não atende — dados ainda podem estar nos sistemas operacionais.",
      "ERRADO. Disable account não remove os dados — apenas o acesso."
    ]
  },
];
