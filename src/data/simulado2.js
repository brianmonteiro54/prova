// Simulado 2 — Baseado em questões reais de prova (65 questões)
// Cobre todos os 4 domínios da certificação AWS DEA-C01

export const simulado2Questions = [
  // ===== DOMAIN 1: Data Ingestion and Transformation =====
  {
    id: 1, domain: 1,
    en: "A company is setting up a secure and highly available managed workflow orchestration using Apache Airflow in AWS via Amazon MWAA. A data engineer needs to establish an SSH connection to a remote Amazon EC2 instance from the MWAA environment using the SSHOperator in a DAG. What should the data engineer do?",
    pt: "Uma empresa está configurando orquestração de workflow gerenciada com Apache Airflow no AWS via Amazon MWAA. Um engenheiro precisa estabelecer uma conexão SSH para uma instância EC2 remota a partir do ambiente MWAA usando SSHOperator em um DAG. O que o engenheiro deve fazer?",
    options: [
      "Add the apache-airflow-providers-snowflake Python dependency on the web server and place it in the dags directory",
      "Install the apache-airflow-providers-ssh package on the web server by configuring the authorized_keys file",
      "Install the Apache Airflow base package and generate an Apache Airflow AWS connection URI string",
      "Install the apache-airflow-providers-ssh package on the web server via the requirements.txt file"
    ],
    correct: 3,
    explanations: [
      "ERRADO. O pacote snowflake é para conexões com Snowflake via Secrets Manager, não para SSH.",
      "ERRADO. Embora o pacote SSH esteja correto, configurar authorized_keys não é o método. Deve ser via requirements.txt.",
      "ERRADO. Isso é necessário apenas para conexões via AWS Secrets Manager, não para SSHOperator.",
      "CORRETO! Para usar SSHOperator no MWAA, é preciso adicionar apache-airflow-providers-ssh no requirements.txt para que o MWAA instale a dependência no web server."
    ]
  },
  {
    id: 2, domain: 1,
    en: "A startup has a Salesforce SaaS application with a data warehouse in Amazon Redshift. The company needs to set up an automated solution to continuously send encrypted data from SaaS to Redshift, retaining full control over encryption keys. Which solution meets these requirements with LEAST operational overhead?",
    pt: "Uma startup tem aplicação SaaS Salesforce com data warehouse no Redshift. Precisa configurar solução automatizada para enviar continuamente dados criptografados do SaaS para o Redshift, mantendo controle total sobre as chaves. Qual solução atende com MENOR overhead operacional?",
    options: [
      "Create a workflow in Amazon MWAA, set up Salesforce to forward data via JDBC connector to Redshift. Use AWS managed keys",
      "Use an Amazon AppFlow flow with a Run on event trigger from Salesforce to Redshift. Use customer-managed key for encryption",
      "Set up an AWS Glue Workflow to orchestrate Crawler and ETL Job between Salesforce and Redshift, triggered by EventBridge",
      "Launch a user-defined function (UDF) in Redshift with a Run on demand flow trigger to synchronize Salesforce data"
    ],
    correct: 1,
    explanations: [
      "ERRADO. MWAA tem alto overhead operacional. AWS managed keys não dão controle total — precisa de customer-managed key.",
      "CORRETO! AppFlow é serviço gerenciado de integração SaaS-AWS. 'Run on event' envia continuamente. Customer-managed key dá controle total à empresa.",
      "ERRADO. Glue Workflow é para ETL interno na AWS, não para integração com SaaS externos como Salesforce.",
      "ERRADO. UDFs do Redshift não acessam serviços SaaS externos. 'Run on demand' é trigger do AppFlow, não de UDF."
    ]
  },
  {
    id: 3, domain: 1,
    en: "A company has 10 TB of data in S3. New data must be available for occasional SQL queries. Data older than 3 years must be securely stored but accessible within 8 hours. Data older than 10 years should be deleted. Which solution is MOST cost-effective?",
    pt: "Uma empresa tem 10 TB de dados no S3. Dados novos devem estar disponíveis para queries SQL ocasionais. Dados com mais de 3 anos devem ser armazenados de forma segura, mas acessíveis em 8 horas. Dados com mais de 10 anos devem ser deletados. Qual solução é MAIS econômica?",
    options: [
      "Store new data in S3 Standard-IA. Use Athena for queries. Lifecycle to S3 Glacier Flexible Retrieval after 3 years and delete after 10 years",
      "Use Amazon RDS for new data. Lambda exports snapshots to S3 Standard. Lifecycle to Glacier after 3 years, delete after 10",
      "Use Amazon Redshift with Spectrum to query S3. Lifecycle to S3 Glacier Deep Archive. Delete after 10 years",
      "Use S3 Intelligent-Tiering with Deep Archive Access. Use Athena for queries. Configure to purge after 10 years"
    ],
    correct: 0,
    explanations: [
      "CORRETO! S3 Standard-IA é ideal para acesso ocasional. Glacier Flexible Retrieval permite acesso em 8h. Lifecycle automatiza tudo. Athena consulta sem mover dados.",
      "ERRADO. RDS não é otimizado para storage barato. Gerenciar snapshots adiciona overhead operacional.",
      "ERRADO. Glacier Deep Archive leva 12-48h para retornar dados, não atende o SLA de 8h.",
      "ERRADO. Deep Archive Access tier do Intelligent-Tiering tem retrieval de 12-48h, não atende o requisito de 8h."
    ]
  },
  {
    id: 4, domain: 1,
    en: "A financial company collects logs from cryptocurrency exchanges into a centralized S3 bucket, automatically converting incoming application logs to Apache Parquet format. The data must be delivered in near real-time. Which option meets this with LEAST operational overhead?",
    pt: "Uma empresa financeira coleta logs de exchanges de criptomoedas em um bucket S3 centralizado, convertendo automaticamente logs em formato Apache Parquet. Os dados devem ser entregues em near real-time. Qual opção atende com MENOR overhead operacional?",
    options: [
      "Use Amazon MWAA to forward logs to S3 which automatically transforms to Parquet",
      "Send logs to Apache Hive on Amazon EMR cluster, configure HiveQL UNLOAD to S3 in Parquet format",
      "Send logs to Amazon Data Firehose. Configure Firehose to trigger Lambda for Parquet conversion and deliver to S3",
      "Send logs to Kinesis Data Streams with KCL on Auto Scaling EC2 instances to convert and store in S3"
    ],
    correct: 2,
    explanations: [
      "ERRADO. MWAA é para orquestração de workflows, não converte logs em Parquet automaticamente.",
      "ERRADO. EMR requer gerenciamento de cluster — não é o menor overhead operacional.",
      "CORRETO! Data Firehose tem suporte nativo para conversão JSON→Parquet, é serverless, e entrega em near real-time. Menor overhead possível.",
      "ERRADO. EC2 com Auto Scaling exige gerenciamento de servidores — alto overhead operacional."
    ]
  },
  {
    id: 5, domain: 1,
    en: "A company collects user data with PII from registration system into S3 data lake. The team must automate identifying new and existing PII data and mask it via S3 Object Lambda using ComprehendPiiRedactionS3ObjectLambda. The solution must trigger notifications and provide detailed reports on PII detection. Which solution meets this with MINIMAL operational overhead?",
    pt: "Uma empresa coleta dados com PII de cadastro de usuários em S3 data lake. A equipe precisa identificar PII automaticamente e mascarar via S3 Object Lambda usando ComprehendPiiRedactionS3ObjectLambda. A solução deve disparar notificações e fornecer relatórios detalhados. Qual solução atende com MÍNIMO overhead operacional?",
    options: [
      "Implement S3 Event notifications to trigger Lambda that uses custom scripts for PII detection",
      "Utilize AWS Lake Formation to set up data access rules that automatically scan for PII",
      "Activate Amazon Inspector to assess the S3 data lake for PII compliance",
      "Activate Amazon Macie for continuous monitoring and PII identification. Configure EventBridge rule to trigger the masking function on Macie findings"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Custom scripts para detecção de PII têm alto overhead de desenvolvimento e manutenção.",
      "ERRADO. Lake Formation gerencia acesso a data lakes, mas não detecta PII automaticamente.",
      "ERRADO. Inspector é para avaliação de segurança de EC2/aplicações, não detecta PII em objetos S3.",
      "CORRETO! Macie usa ML para descobrir PII em S3 automaticamente. EventBridge captura findings e dispara o Object Lambda. Solução totalmente gerenciada."
    ]
  },
  {
    id: 6, domain: 1,
    en: "A company uses AWS Glue for medical records processing in JSON. Glue job was configured with 20 DPUs but execution is slow. How can the engineer determine the optimal DPU capacity?",
    pt: "Uma empresa usa AWS Glue para processar registros médicos em JSON. O Glue job foi configurado com 20 DPUs mas está lento. Como determinar a capacidade DPU ideal?",
    options: [
      "Visualize the Glue job in the AWS Glue console's ETL section",
      "Use a job bookmark to track DPU consumption",
      "Examine past job runs in Job run monitoring section. Visualize profiled metrics to determine appropriate DPU capacity",
      "Use CloudWatch Logs Insights to query for 'DPU' to optimize"
    ],
    correct: 2,
    explanations: [
      "ERRADO. A seção ETL no console mostra apenas configurações, não análise de DPU.",
      "ERRADO. Job bookmarks rastreiam dados processados (não duplicar), não DPUs.",
      "CORRETO! O Job run monitoring no console do Glue mostra métricas profiled (executores alocados vs. necessários) que indicam o DPU ideal.",
      "ERRADO. CloudWatch Logs mostra detalhes agregados, mas não ajuda a determinar capacidade DPU ideal."
    ]
  },
  {
    id: 7, domain: 1,
    en: "A manufacturing company uses S3 as data lake. Sales team analyzes last 3 months frequently. Generates semi-annual report with 6 months of data. Data older than 6 months has no further access but must be retained. Which solutions meet requirements MOST cost-effectively? (Select TWO)",
    pt: "Uma empresa manufatura usa S3 como data lake. Equipe de vendas analisa últimos 3 meses frequentemente. Gera relatório semestral com 6 meses. Dados com mais de 6 meses não terão acesso mas devem ser retidos. Quais soluções atendem com MAIOR economia? (Selecione DUAS)",
    options: [
      "Copy last 3 months to Redshift and unload older data to S3. Use Redshift Spectrum for 6-month analysis (CORRETO)",
      "Copy last 3 months to Redshift and unload to Glacier Instant Retrieval. Use Spectrum for 6-month analysis",
      "S3 Lifecycle policy to move data >6 months to Glacier Flexible Retrieval",
      "S3 Lifecycle policy to move data >6 months to Glacier Deep Archive (CORRETO)"
    ],
    correct: 0,
    explanations: [
      "CORRETO! 3 meses recentes em Redshift para queries rápidas, dados de 3-6 meses no S3 acessíveis via Spectrum.",
      "ERRADO. Não é possível UNLOAD direto para Glacier. Spectrum não consulta dados em Glacier.",
      "ERRADO. Glacier Flexible Retrieval é mais caro que Deep Archive para dados raramente acessados.",
      "CORRETO! Deep Archive é o mais barato para dados que não serão acessados mas devem ser retidos. NOTA: Pode marcar opção A ou D — ambas estão corretas."
    ]
  },
  {
    id: 8, domain: 1,
    en: "A healthcare ML model integrates patient records, treatments, and clinical trials. Engineer must guarantee data integrity for ML predictions and streamline data preparation. Which solution meets these requirements?",
    pt: "Um modelo ML de saúde integra registros de pacientes, tratamentos e ensaios clínicos. Engenheiro deve garantir integridade dos dados para predições ML e otimizar a preparação. Qual solução atende?",
    options: [
      "Implement Amazon SageMaker Processing for input data",
      "Use Amazon Redshift to aggregate and analyze data before feeding model",
      "Employ Amazon SageMaker Data Wrangler for EDA",
      "Use Amazon SageMaker workflows with ML Lineage Tracking step for data preparation"
    ],
    correct: 3,
    explanations: [
      "ERRADO. SageMaker Processing processa dados, mas não garante lineage/governança automática.",
      "ERRADO. Redshift agrega dados, mas não fornece lineage tracking para ML.",
      "ERRADO. Data Wrangler é para EDA, mas não inclui lineage tracking nativo.",
      "CORRETO! ML Lineage Tracking cria/armazena info sobre cada etapa do workflow ML — essencial para governança e auditoria de modelos."
    ]
  },
  {
    id: 9, domain: 1,
    en: "A multinational data system needs granular access control at database, table, column, row, AND cell levels with minimal operational overhead. Which option meets these requirements?",
    pt: "Sistema de dados multinacional precisa de controle de acesso granular em níveis de banco, tabela, coluna, linha E célula com mínimo overhead operacional. Qual opção atende?",
    options: [
      "Implement Amazon RDS with IAM database authentication",
      "Implement Amazon Aurora as catalog with SQL GRANTs",
      "Establish data lake with AWS Lake Formation, controlling access via Lake Formation data filters",
      "Deploy Hive metastore on Amazon EMR with HiveQL DDL statements"
    ],
    correct: 2,
    explanations: [
      "ERRADO. RDS IAM auth controla acesso ao banco, não suporta nível de linha/célula nativamente.",
      "ERRADO. SQL GRANTs no Aurora não suportam nível de linha/célula sem configuração complexa.",
      "CORRETO! Lake Formation Data Filters permitem controle granular em todos os níveis (banco, tabela, coluna, linha, célula) com mínimo overhead.",
      "ERRADO. HiveQL DDL não oferece granularidade de linha/célula. Alto overhead com EMR."
    ]
  },
  {
    id: 10, domain: 1,
    en: "Containerized app on Amazon EKS with EC2 nodes. Each container processes distinct datasets with NO data sharing between containers. Which storage offers LOWEST latency?",
    pt: "Aplicação containerizada em Amazon EKS com nós EC2. Cada container processa datasets distintos SEM compartilhamento entre containers. Qual storage oferece MENOR latência?",
    options: [
      "Connect containers directly to Amazon DynamoDB Accelerator (DAX)",
      "Connect containers directly to Amazon MemoryDB for Redis",
      "Use PersistentVolume backed by Amazon EFS via AWS Controllers for Kubernetes",
      "Use ephemeral volume provided by the node's RAM"
    ],
    correct: 3,
    explanations: [
      "ERRADO. DAX requer chamadas de rede — maior latência que storage local.",
      "ERRADO. MemoryDB é serviço externo, requer rede — maior latência.",
      "ERRADO. EFS via rede tem mais latência que storage local.",
      "CORRETO! Volume efêmero em RAM do nó é storage local — mínima latência. Como não há compartilhamento entre containers, é ideal."
    ]
  },
  {
    id: 11, domain: 1,
    en: "Application sends data to SQS, multiple ECS tasks consume messages. Engineer must ensure each message is processed once. Which events lead to message removal? (Select THREE)",
    pt: "Aplicação envia dados para SQS, múltiplas tarefas ECS consomem mensagens. Engenheiro deve garantir que cada mensagem seja processada uma vez. Quais eventos removem mensagens? (Selecione TRÊS)",
    options: [
      "The maxReceiveCount for a message was exceeded (CORRETO)",
      "A purge operation was performed on the queue (CORRETO)",
      "An application receives a message without deleting it",
      "The visibility timeout expires on a message",
      "A DeleteMessage API call was made (CORRETO)"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Quando maxReceiveCount é excedido, mensagem vai para DLQ (e é removida da queue principal).",
      "CORRETO! Purge limpa toda a queue instantaneamente.",
      "ERRADO. Receber sem deletar apenas inicia visibility timeout — mensagem permanece na queue.",
      "ERRADO. Quando visibility timeout expira, mensagem volta a ficar visível para outros consumers — não é removida.",
      "CORRETO! DeleteMessage API explicitamente remove a mensagem após processamento bem-sucedido."
    ]
  },
  {
    id: 12, domain: 1,
    en: "Healthcare company uses AWS Glue DataBrew. PII data must be replaced with authentic-looking values to maintain structure and statistical distribution. Which technique should be used?",
    pt: "Empresa de saúde usa AWS Glue DataBrew. Dados PII devem ser substituídos por valores realistas mantendo estrutura e distribuição estatística. Qual técnica usar?",
    options: ["Decryption", "Nulling out or deletion", "Probabilistic encryption", "Substitution"],
    correct: 3,
    explanations: [
      "ERRADO. Decryption converte dados criptografados de volta — não mascara.",
      "ERRADO. Nulling/deletion remove os dados — não mantém estrutura/distribuição.",
      "ERRADO. Probabilistic encryption gera ciphertext diferente — não mantém aparência autêntica.",
      "CORRETO! Substitution substitui PII por valores autênticos (ex: nome real → nome fictício realista) mantendo estrutura/distribuição."
    ]
  },
  {
    id: 13, domain: 1,
    en: "Build data lake on S3 with Apache Parquet for complex analytics with granular user access. Which approach meets requirements in SHORTEST time MOST cost-effectively?",
    pt: "Construir data lake em S3 com Apache Parquet para analytics complexa com acesso granular por usuário. Qual abordagem atende em MENOR tempo e MAIS economicamente?",
    options: [
      "Use Amazon MWAA to orchestrate data processing workflows with access controls",
      "Run AWS Glue crawler to catalog data and register S3 path on Lake Formation. Allocate granular permissions",
      "Import data from S3 using Lake Formation blueprint and grant permissions",
      "Use Lake Formation to register the S3 bucket. Assign granular permissions"
    ],
    correct: 1,
    explanations: [
      "ERRADO. MWAA não fornece controle granular nativo em data lakes.",
      "CORRETO! Crawler cataloga schema automaticamente. Registrar path no Lake Formation e conceder permissões granulares atende todos os requisitos rapidamente.",
      "ERRADO. Lake Formation blueprints importam de RDS/EC2, não de S3.",
      "ERRADO. Você registra o caminho S3 (path), não o nome do bucket no Lake Formation."
    ]
  },
  {
    id: 14, domain: 1,
    en: "Need to transfer Salesforce data to Redshift daily, only records updated since last run, with manual trigger option for testing. Which Amazon AppFlow trigger to use?",
    pt: "Transferir dados Salesforce para Redshift diariamente, apenas registros atualizados desde a última execução, com opção de trigger manual para testes. Qual trigger AppFlow usar?",
    options: ["Full transfer schedule-triggered flows", "On-demand flows", "Incremental transfer schedule-triggered flows", "Event-triggered flows"],
    correct: 2,
    explanations: [
      "ERRADO. Full transfer envia TODOS os registros sempre — não é incremental.",
      "ERRADO. On-demand é apenas manual — não atende requisito de execução diária automática.",
      "CORRETO! Incremental schedule-triggered: transfere apenas registros novos/alterados desde última execução, com agendamento. Atende todos os requisitos.",
      "ERRADO. Event-triggered roda quando há mudança no SaaS, não em horário fixo diário."
    ]
  },
  {
    id: 15, domain: 1,
    en: "Streaming microservices on Amazon MSK. After deploying new algorithm, content recommendation microservice receives data from feedback collection topic. How to ensure each microservice accesses only its designated topic?",
    pt: "Microsserviços de streaming em Amazon MSK. Após deploy de novo algoritmo, microsserviço de recomendação recebe dados do tópico de feedback. Como garantir que cada microsserviço acesse apenas seu tópico designado?",
    options: [
      "Modify partitioning key in producer application",
      "Deploy individual source connectors with Kafka Connect",
      "Update security group configurations on Kafka broker ENIs",
      "Set up Amazon MSK to utilize Kafka ACLs (Access Control Lists) restricting permissions per microservice"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Partitioning key distribui dados entre partições, não controla acesso por tópico.",
      "ERRADO. Kafka Connect é para integração, não para controle de acesso a tópicos.",
      "ERRADO. Security groups operam em nível de rede/IP, não em nível de tópico Kafka.",
      "CORRETO! Kafka ACLs no MSK permitem definir 'principal X pode ler/escrever no tópico Y' — controle granular por tópico."
    ]
  },
  {
    id: 16, domain: 1,
    en: "Multiple AWS accounts. Need to streamline logging queries across all accounts with minimal setup and management. Which provides MOST efficient solution?",
    pt: "Múltiplas contas AWS. Precisa simplificar queries de logs em todas as contas com mínima configuração. Qual fornece a solução MAIS eficiente?",
    options: [
      "Use AWS CloudTrail Lake for centralized logging",
      "Configure AWS Lake Formation for centralized logging",
      "Manually establish a centralized data lake on S3 for each account",
      "Deploy Amazon Athena for centralized logging"
    ],
    correct: 0,
    explanations: [
      "CORRETO! CloudTrail Lake integra coleta, armazenamento e query SQL de logs em um único serviço gerenciado, multi-account/multi-region.",
      "ERRADO. Lake Formation é para data lakes analíticos, não específico para logs.",
      "ERRADO. Setup manual em cada conta tem alto overhead de gerenciamento.",
      "ERRADO. Athena precisa de logs já agregados em S3 — não centraliza por si só."
    ]
  },
  {
    id: 17, domain: 1,
    en: "DynamoDB table for real-time inventory has throttled items during peak hours. Need to monitor access patterns, traffic trends, and identify hot partition keys. Which steps? (Select TWO)",
    pt: "Tabela DynamoDB de inventário real-time tem itens throttled em pico. Precisa monitorar padrões de acesso, tendências de tráfego e identificar partition keys quentes. Quais passos? (Selecione DUAS)",
    options: [
      "Use Amazon Athena to analyze access patterns",
      "Use CloudWatch Contributor Insights to find most accessed/throttled items (CORRETO)",
      "Redesign DynamoDB table with high cardinality key for even distribution (CORRETO)",
      "Use Amazon QuickSight to visualize access patterns",
      "Increase provisioned read/write capacity"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Athena analisa S3, não fornece insights diagnóstico em tempo real do DynamoDB.",
      "CORRETO! Contributor Insights identifica os itens/partições mais acessados e throttled — diagnóstico exato.",
      "CORRETO! High cardinality key distribui escritas/leituras uniformemente entre partições, evitando hot partitions.",
      "ERRADO. QuickSight é visualização, não diagnóstico em tempo real.",
      "ERRADO. Aumentar capacidade não resolve distribuição desigual — só aumenta custos."
    ]
  },
  {
    id: 18, domain: 1,
    en: "Retail company needs data quality on inventory: 'Stock Quantity' must be positive integer, 'Product Category' cannot be null/empty. Which AWS service provides data quality with MINIMAL operational effort?",
    pt: "Empresa de varejo precisa qualidade de dados de inventário: 'Stock Quantity' deve ser inteiro positivo, 'Product Category' não pode ser null/vazio. Qual serviço fornece qualidade com MÍNIMO esforço?",
    options: [
      "AWS Lambda functions to validate and correct data on updates",
      "AWS Glue DataBrew recipes to validate and rectify data",
      "AWS Glue ETL jobs with custom scripts for quality constraints",
      "AWS Glue DataBrew ruleset defining data quality rules for specific columns"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Lambda exige código customizado e gerenciamento — alto overhead.",
      "ERRADO. Recipes são para transformação de dados, não validação direta de regras de qualidade.",
      "ERRADO. ETL jobs com custom scripts demandam mais esforço operacional.",
      "CORRETO! DataBrew ruleset permite definir regras de qualidade declarativamente para colunas específicas, sem código."
    ]
  },
  {
    id: 19, domain: 1,
    en: "Game retailer with MySQL on RDS. Frequent queries on last 3 months. Older data archived but needed for quarterly reports joined with recent data. Which provides optimal performance and cost?",
    pt: "Varejista de jogos com MySQL em RDS. Queries frequentes nos últimos 3 meses. Dados antigos arquivados mas necessários para relatórios trimestrais com join nos dados recentes. Qual oferece performance ótima e custo?",
    options: [
      "Sync 1 year on RDS read replica. Move historical to S3. Athena to join historical and current",
      "AWS Glue ETL to load 1 year into Redshift. Glue Data Catalog of S3. Athena to join",
      "Aurora for real-time. Archive older to S3. QuickSight for analytics combining current and historical",
      "Migrate historical to S3. Daily transfer of current data from RDS to Redshift. Use Redshift + Spectrum to join"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Manter 1 ano em read replica é caro. RDS não é otimizado para analytics.",
      "ERRADO. Mover 1 ano para Redshift e depois para S3 é redundante e ineficiente.",
      "ERRADO. Aurora é para OLTP, não para queries analíticas pesadas em grandes volumes.",
      "CORRETO! Dados recentes em Redshift (queries rápidas), históricos em S3 (barato), Spectrum permite join entre ambos sem mover dados."
    ]
  },
  {
    id: 20, domain: 1,
    en: "AWS Glue ETL jobs with irregular execution times. Need MOST detailed data and analysis to identify root causes. Which method?",
    pt: "Jobs Glue ETL com tempos irregulares. Precisa dados e análises MAIS detalhados para identificar causas. Qual método?",
    options: [
      "Use AWS CloudTrail Data Events for API activity",
      "Query AWS Glue Data Catalog using Athena for real-time monitoring",
      "Profile and monitor Glue operations using Glue Monitoring + Job Profiler through CloudWatch",
      "Configure AWS X-Ray to trace Glue job executions"
    ],
    correct: 2,
    explanations: [
      "ERRADO. CloudTrail Data Events é para auditoria de API, não para análise detalhada de performance.",
      "ERRADO. Glue Data Catalog tem metadados de schemas, não métricas de performance de jobs.",
      "CORRETO! Glue Job Profiler via CloudWatch fornece métricas detalhadas (tempo de execução, taxa de processamento, uso de memória) — essencial para identificar gargalos.",
      "ERRADO. X-Ray é para aplicações distribuídas/microservices, não específico para Glue."
    ]
  },
  {
    id: 21, domain: 1,
    en: "Marketing agency with daily campaign data in S3 data lake. Want platform allowing analysts to visually verify data quality before transformation. Which has LEAST management overhead?",
    pt: "Agência de marketing com dados diários de campanhas em S3 data lake. Quer plataforma que permita analistas verificar qualidade visualmente antes de transformar. Qual tem MENOR overhead?",
    options: [
      "Set up EMR cluster with Spark and Zeppelin. Daily transfer to HDFS. Spark MLlib for quality checks",
      "Implement Kinesis Data Firehose to stream S3 to OpenSearch. Use OpenSearch Dashboards",
      "Connect S3 data lake as a dataset in AWS Glue DataBrew and create profiling job for data quality metrics",
      "Develop AWS Glue ETL jobs using Deequ Spark library. Use Athena for visualization"
    ],
    correct: 2,
    explanations: [
      "ERRADO. EMR cluster requer gerenciamento — overhead significativo.",
      "ERRADO. Streaming S3 para OpenSearch é overkill para dados em batch já em S3.",
      "CORRETO! DataBrew tem profiling visual, regras de qualidade configuráveis sem código, é serverless. Menor overhead possível.",
      "ERRADO. Deequ é poderoso mas requer código Spark — não é visual e tem mais overhead."
    ]
  },
  {
    id: 22, domain: 1,
    en: "Financial company with crypto data in S3 from global exchanges. Inconsistencies in upload times. Need high availability, fast access globally, data sovereignty. Which actions LEAST overhead?",
    pt: "Empresa financeira com dados cripto em S3 de exchanges globais. Inconsistências em tempos de upload. Precisa alta disponibilidade, acesso rápido global, soberania de dados. Quais ações MENOR overhead?",
    options: [
      "Use S3 Express One Zone and Direct Connect from each region",
      "Enable S3 Transfer Acceleration and use S3 Cross-Region Replication (CRR)",
      "Use S3 Express One Zone with S3 CRR",
      "Enable S3 Transfer Acceleration and use Direct Connect from each region"
    ],
    correct: 1,
    explanations: [
      "ERRADO. S3 Express One Zone é single-AZ — não é apropriado para fontes globais.",
      "CORRETO! Transfer Acceleration usa edge locations (CloudFront) para uploads rápidos. CRR replica para regiões para baixa latência e soberania.",
      "ERRADO. Express One Zone não atende fontes globais espalhadas.",
      "ERRADO. Direct Connect é dedicado para on-premises, não resolve replicação global."
    ]
  },
  {
    id: 23, domain: 1,
    en: "Redshift query: select current_schema(), userid from sales_data where order_date='...'. Error: 'Function current_schema() not supported... not supported on Redshift tables'. What is the root cause?",
    pt: "Query Redshift com current_schema() junto com SELECT em tabela. Erro: 'Function current_schema() not supported on Redshift tables'. Qual a causa raiz?",
    options: [
      "current_schema() is compute-node only, can't run with leader-node tables",
      "current_schema() is leader-node only, can't run without table reference",
      "current_schema() is leader-node only, can't run with query referencing user tables on compute nodes",
      "current_schema() is compute-node only, can't run with column references on compute nodes"
    ],
    correct: 2,
    explanations: [
      "ERRADO. current_schema() é leader-node only, não compute-node.",
      "ERRADO. O problema não é ausência de tabela — é a combinação com tabela de usuário.",
      "CORRETO! current_schema() é função leader-node only. Tabelas de usuário ficam em compute nodes. Misturar os dois gera erro.",
      "ERRADO. Mesma confusão sobre leader vs. compute node."
    ]
  },
  {
    id: 24, domain: 1,
    en: "Find product names starting with 'TAD' or 'BAG' in Redshift, fastest possible. Which query?",
    pt: "Encontrar nomes de produtos começando com 'TAD' ou 'BAG' no Redshift, o mais rápido. Qual query?",
    options: [
      "WHERE product_name SIMILAR TO '(TAD|BAG)%'",
      "WHERE product_name !~ '^TAD|BAG'",
      "WHERE product_name ~ '^TAD|BAG'",
      "WHERE product_name LIKE 'TAD%' OR product_name LIKE 'BAG%'"
    ],
    correct: 3,
    explanations: [
      "ERRADO. SIMILAR TO usa REGEX internamente — mais lento que LIKE.",
      "ERRADO. !~ é negação POSIX regex — encontra o oposto e é mais lento.",
      "ERRADO. ~ POSIX regex é mais lento que LIKE.",
      "CORRETO! LIKE não usa regex — é o operador de pattern matching mais rápido no Redshift."
    ]
  },
  {
    id: 25, domain: 1,
    en: "On-prem MySQL replicating to S3, ongoing changes must be reflected. Which solutions? (Select TWO)",
    pt: "MySQL on-premises replicando para S3, mudanças contínuas devem ser refletidas. Quais soluções? (Selecione DUAS)",
    options: [
      "Use AWS DMS to migrate database to S3 with Full Load + CDC (CORRETO)",
      "Use AWS Lambda for daily replication",
      "Use Apache Parquet format when writing to S3 (CORRETO)",
      "Use CSV format when writing to S3",
      "Use AWS DMS with CDC Only"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Full Load + CDC migra dados existentes E captura mudanças contínuas — ideal para sincronização contínua.",
      "ERRADO. Lambda diário é batch, não captura mudanças contínuas em tempo real.",
      "CORRETO! Parquet é colunar — armazenamento compacto e queries mais rápidas. NOTA: Marque uma opção CDC + uma de formato.",
      "ERRADO. CSV é menos eficiente que Parquet para queries analíticas.",
      "ERRADO. CDC Only não migra dados existentes — perde o estado inicial."
    ]
  },
  {
    id: 26, domain: 1,
    en: "Streaming JSON from Kinesis Data Streams to columnar format with 60-second buffering, queryable with SQL and visualization in BI tools. Which solution meets requirements?",
    pt: "Streaming JSON do Kinesis Data Streams para formato colunar com buffer de 60 segundos, queryable com SQL e visualizável em BI. Qual solução atende?",
    options: [
      "Store JSON in S3, trigger Lambda on Put events to transform to ORC, query with Athena, JDBC for BI",
      "Use Data Firehose to stream and transform JSON to Parquet, deliver to S3, define schema in Glue Data Catalog, query with Athena via JDBC",
      "Use Amazon MSK for streaming, configure consumer to transform to Parquet, store in Redshift, JDBC for BI",
      "Store JSON in S3, S3 Event triggers Glue job to convert to ORC, load to RDS PostgreSQL, JDBC for BI"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Lambda triggers em S3 não garantem buffer de 60s e é mais complexo.",
      "CORRETO! Firehose tem conversão nativa JSON→Parquet com buffer configurável (60s). Glue Data Catalog + Athena + JDBC = solução serverless completa.",
      "ERRADO. MSK + Redshift agregam complexidade desnecessária para esse cenário.",
      "ERRADO. RDS PostgreSQL não é otimizado para analytics em escala. Glue trigger via S3 Event não é direto."
    ]
  },
  {
    id: 27, domain: 1,
    en: "E-commerce noticed accounts with minor name/email variations from flagged accounts. Existing system can't detect subtle variations. Which solution detects similar accounts?",
    pt: "E-commerce notou contas com pequenas variações de nome/email a partir de contas flagged. Sistema atual não detecta variações sutis. Qual solução detecta contas similares?",
    options: [
      "AWS Glue PySpark with regex to compare new accounts vs flagged",
      "Redshift Spectrum with SQL LIKE for similarity",
      "Implement FindMatches transform in AWS Glue to identify potentially fraudulent accounts",
      "Athena with REGEXP_LIKE for keyword search"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Regex requer padrões precisos — não captura variações sutis automaticamente.",
      "ERRADO. LIKE faz match exato/wildcard básico — não detecta similaridades.",
      "CORRETO! FindMatches usa ML para encontrar registros similares mesmo com variações em nomes/emails — perfeito para detecção de fraude.",
      "ERRADO. REGEXP_LIKE pode falhar em variações que não correspondem a padrões pré-definidos."
    ]
  },
  {
    id: 28, domain: 1,
    en: "Streaming service has dataset with nulls, irrelevant data, duplicates. Goal: classify subscribers churn vs stay. Which solution with LEAST overhead?",
    pt: "Serviço de streaming com dataset com nulls, dados irrelevantes e duplicatas. Objetivo: classificar churn vs ficar. Qual solução com MENOR overhead?",
    options: [
      "SageMaker HyperPod for cleaning + built-in algorithm for binary classification",
      "SageMaker Canvas for cleaning + multi-class text classification model",
      "SageMaker Data Wrangler for cleaning + SageMaker Autopilot for binary classification",
      "SageMaker Canvas's automated data cleaning + built-in binary classification model"
    ],
    correct: 3,
    explanations: [
      "ERRADO. HyperPod é para clusters ML pesados (LLMs, foundation models) — overkill.",
      "ERRADO. Multi-class text classification é para texto em categorias — não é caso de churn (binário).",
      "ERRADO. Data Wrangler + Autopilot são poderosos mas requerem mais setup que Canvas.",
      "CORRETO! Canvas é no-code: limpa dados e treina modelo binário (churn = 2 categorias) sem programação."
    ]
  },
  {
    id: 29, domain: 1,
    en: "Bank requires Redshift to prevent read/write access while inserting data. How can engineer meet this?",
    pt: "Banco requer que Redshift bloqueie acesso de leitura/escrita ao inserir dados. Como atender?",
    options: [
      "IAM Policy to restrict access during inserts",
      "Use a LOCK command at start of transaction before inserting",
      "Implement Serializable Isolation level for inserting transactions",
      "Create separate schema for data-loading operations"
    ],
    correct: 1,
    explanations: [
      "ERRADO. IAM controla acesso ao cluster, não bloqueia em nível de tabela durante transações.",
      "CORRETO! LOCK TABLE em ACCESS EXCLUSIVE bloqueia leituras/escritas durante a transação — exatamente o requisito.",
      "ERRADO. Serializable garante isolamento mas não bloqueia acessos concorrentes ativamente.",
      "ERRADO. Schema separado não impede acesso à tabela durante insert — só organiza permissões."
    ]
  },
  {
    id: 30, domain: 1,
    en: "Medical records in S3. Policy: new data immediate access, >5 years archived but retrievable in 24h, >15 years deleted. Which solutions MOST cost-effective? (Select TWO)",
    pt: "Registros médicos em S3. Política: dados novos com acesso imediato, >5 anos arquivados mas recuperáveis em 24h, >15 anos deletados. Quais soluções MAIS econômicas? (Selecione DUAS)",
    options: [
      "S3 Standard for new data + Athena for queries",
      "S3 Intelligent-Tiering automatically managing access",
      "Lifecycle to migrate to S3 Glacier Flexible Retrieval after 5 years and delete after 15 years (CORRETO)",
      "S3 Standard-IA for queries with Athena (CORRETO)",
      "Lifecycle to migrate to S3 Glacier Instant Retrieval after 5 years and delete after 15 years"
    ],
    correct: 2,
    explanations: [
      "ERRADO. S3 Standard é mais caro que IA para acesso pouco frequente.",
      "ERRADO. Intelligent-Tiering tem cobranças de monitoramento desnecessárias quando padrão de acesso é claro.",
      "CORRETO! Glacier Flexible Retrieval recupera em horas (atende 24h), bem mais barato que Standard. Lifecycle automatiza tudo.",
      "CORRETO! S3 Standard-IA para acesso ocasional + Athena. NOTA: Marque essa OU outra similar.",
      "ERRADO. Instant Retrieval é caro demais para dados raramente acessados — Flexible Retrieval atende o SLA de 24h por menos."
    ]
  },
  {
    id: 31, domain: 1,
    en: "Glue ETL job uses TRUNCATE before insert. Jobs hang due to AccessShareLock from rogue queries. How to resolve? (Select TWO)",
    pt: "Job Glue ETL usa TRUNCATE antes do insert. Jobs travam por AccessShareLock de queries indevidas. Como resolver? (Selecione DUAS)",
    options: [
      "Run query to identify sessions holding locks (CORRETO)",
      "Use pg_terminate_backend to terminate locking session (CORRETO)",
      "Use EXPLAIN to analyze query execution plan",
      "Use REINDEX on table to clear lock",
      "Use VACUUM to clean and release lock"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Identificar PID das sessões que mantêm locks é o primeiro passo.",
      "CORRETO! pg_terminate_backend(pid) encerra a sessão e libera o lock. NOTA: Marque ambas.",
      "ERRADO. EXPLAIN é para otimização, não libera locks ativos.",
      "ERRADO. REINDEX reconstrói índices, não libera locks.",
      "ERRADO. VACUUM limpa espaço, não libera locks ativos de outras sessões."
    ]
  },
  {
    id: 32, domain: 1,
    en: "Athena queries on 50GB dataset partitioned by date are slow with timeouts. How to resolve with LEAST overhead?",
    pt: "Queries Athena em dataset de 50GB particionado por data estão lentas com timeouts. Como resolver com MENOR overhead?",
    options: [
      "Athena UDFs for custom logic in SQL",
      "Use Partition Projection to calculate partitions from query criteria directly",
      "Query Result Reuse to bypass re-scanning",
      "Athena CTAS to aggregate into fewer larger partitions"
    ],
    correct: 1,
    explanations: [
      "ERRADO. UDFs adicionam complexidade — não resolvem lentidão por muitas partições.",
      "CORRETO! Partition Projection elimina o tempo de carregar metadata de partições (que cresce com o número delas). Athena calcula a partição direto da query — drastica redução de tempo.",
      "ERRADO. Query Result Reuse só ajuda em queries idênticas repetidas — não resolve a lentidão da primeira execução.",
      "ERRADO. CTAS exige duplicar dados e recriar tabela — alto overhead."
    ]
  },
  {
    id: 33, domain: 1,
    en: "Manufacturing IoT data in Amazon Timestream and Redshift. Need to join data via SQL across both. LEAST overhead solution?",
    pt: "Dados IoT manufatura em Amazon Timestream e Redshift. Precisa fazer join via SQL entre ambos. Solução com MENOR overhead?",
    options: [
      "Use Athena Federated Query to query Timestream and Redshift",
      "Export Timestream to S3, COPY to Redshift, query within Redshift",
      "Use Redshift Spectrum to query Timestream",
      "Use Redshift Federated Query for both"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Athena Federated Query suporta Timestream + Redshift via Lambda connectors, sem mover dados.",
      "ERRADO. Exportar e copiar é alto overhead operacional e introduz latência.",
      "ERRADO. Spectrum só consulta dados em S3, não Timestream.",
      "ERRADO. Redshift Federated Query suporta apenas RDS/Aurora — Timestream NÃO é suportado."
    ]
  },
  {
    id: 34, domain: 1,
    en: "Glue job runs weekly. S3 receives daily uploads in /year/month/day. Need to update Data Catalog when partitions are added. Which solution?",
    pt: "Job Glue roda semanalmente. S3 recebe uploads diários em /year/month/day. Precisa atualizar Data Catalog quando partições são adicionadas. Qual solução?",
    options: [
      "Implement code in Lambda to invoke Boto3 create_partition API in Glue automatically",
      "Set enableUpdateCatalog to true in Glue job script",
      "Run MSCK REPAIR TABLE from Athena editor after data is added",
      "Configure scheduled Glue crawler to run daily"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Lambda chama create_partition imediatamente quando arquivo chega ao S3 — partição disponível em tempo real, sem espera.",
      "ERRADO. enableUpdateCatalog atualiza catálogo a partir do OUTPUT do job, não detecta novas partições no INPUT.",
      "ERRADO. MSCK REPAIR é manual — não é automatizado.",
      "ERRADO. Crawler diário tem latência — partições não disponíveis imediatamente após upload."
    ]
  },
  {
    id: 35, domain: 1,
    en: "Ingest data from external SaaS into S3 then analyze with Redshift. LEAST overhead?",
    pt: "Ingerir dados de SaaS externos para S3 e analisar com Redshift. MENOR overhead?",
    options: ["Amazon AppFlow", "Amazon EventBridge", "Amazon MWAA", "AWS Step Functions"],
    correct: 0,
    explanations: [
      "CORRETO! AppFlow é serviço gerenciado para integração SaaS-AWS sem código.",
      "ERRADO. EventBridge é event bus, não serviço de transferência SaaS-AWS.",
      "ERRADO. MWAA exige criar/manter DAGs — alto overhead.",
      "ERRADO. Step Functions orquestra workflows mas não tem conexão nativa com SaaS."
    ]
  },
  {
    id: 36, domain: 1,
    en: "Athena query needs campaigns with >100 orders sorted desc. Initial: SELECT campaign, SUM(orders) FROM ... GROUP BY campaign. What to add?",
    pt: "Query Athena precisa de campanhas com >100 pedidos, ordenado desc. Inicial: SELECT campaign, SUM(orders) ... GROUP BY campaign. O que adicionar?",
    options: [
      "WHERE orders > 100 before GROUP BY",
      "HAVING SUM(clicks) > 100 after GROUP BY",
      "LIMIT 100 at end",
      "HAVING SUM(orders) > 100 followed by ORDER BY total_orders DESC"
    ],
    correct: 3,
    explanations: [
      "ERRADO. WHERE filtra ANTES de agregar — não pode usar SUM aqui.",
      "ERRADO. Filtrar por clicks não é o requisito — é por SUM(orders) > 100.",
      "ERRADO. LIMIT 100 limita resultados, não filtra por valor.",
      "CORRETO! HAVING filtra agregações DEPOIS do GROUP BY. ORDER BY DESC ordena os top performers."
    ]
  },
  {
    id: 37, domain: 1,
    en: "One-time ad-hoc query for specific columns from large Parquet dataset in S3, in Glue Data Catalog. Serverless, no infrastructure. Best solution?",
    pt: "Query ad-hoc única em colunas específicas de grande dataset Parquet em S3, no Glue Data Catalog. Serverless, sem infraestrutura. Melhor solução?",
    options: [
      "S3 Object Lambda access point to filter columns from Parquet",
      "Lambda to read S3 + pandas dataframe + SQL SELECT",
      "Glue DataBrew project with Parquet ingestion and column queries",
      "Use Amazon Athena to perform SQL SELECT queries to fetch specific columns"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Object Lambda é para transformar dados em GET — não é solução nativa para queries SQL.",
      "ERRADO. Lambda + pandas requer código e tem limites de memória/tempo.",
      "ERRADO. DataBrew é para preparação de dados, não query ad-hoc.",
      "CORRETO! Athena é serverless, suporta Parquet (colunar — só lê colunas necessárias), integra com Glue Data Catalog. Solução ideal para query única ad-hoc."
    ]
  },
  {
    id: 38, domain: 1,
    en: "Multi-node Redshift cluster needs to streamline routine refresh of materialized views. MINIMAL operational overhead?",
    pt: "Cluster Redshift multi-node precisa atualizar materialized views rotineiramente. MÍNIMO overhead operacional?",
    options: [
      "AWS Step Functions to orchestrate refresh",
      "AWS Glue workflow to refresh materialized views",
      "AWS Lambda UDF to trigger updates in Redshift",
      "Execute scheduled refresh commands using Redshift query editor v2"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Step Functions é overkill para uma tarefa simples.",
      "ERRADO. Glue Workflow é para ETL externo — não para refresh de view interna.",
      "ERRADO. Lambda UDF requer código e manutenção.",
      "CORRETO! Query Editor v2 tem agendamento nativo de comandos SQL — sem infraestrutura adicional, mínimo overhead."
    ]
  },
  {
    id: 39, domain: 1,
    en: "Pipeline: Glue job transforms MySQL data, loads to S3, then 3 Lambdas process in parallel. LEAST operational overhead orchestration?",
    pt: "Pipeline: Glue job transforma MySQL, carrega para S3, depois 3 Lambdas processam em paralelo. Orquestração com MENOR overhead?",
    options: [
      "AWS Glue workflow orchestrating Glue job and Lambda functions",
      "Apache Airflow on EKS with DAG",
      "AWS Step Functions state machine to manage Glue + Lambda execution",
      "Apache Airflow on EC2 with DAG"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Glue Workflows orquestra apenas Glue jobs/crawlers — não Lambda.",
      "ERRADO. Airflow em EKS exige gerenciar Kubernetes — alto overhead.",
      "CORRETO! Step Functions é serverless, integra Glue + Lambda nativamente, suporta Parallel state para 3 Lambdas concorrentes.",
      "ERRADO. Airflow em EC2 exige gerenciar instâncias e Airflow."
    ]
  },
  {
    id: 40, domain: 1,
    en: "Catalog system for CSV/JSON/XML files plus DocumentDB. Need automatic updates and metadata change monitoring. LEAST overhead?",
    pt: "Sistema de catálogo para arquivos CSV/JSON/XML e DocumentDB. Precisa atualizações automáticas e monitorar mudanças de metadata. MENOR overhead?",
    options: [
      "MongoDB as catalog with Lambda updating metadata",
      "Glue jobs extracting schema details to S3",
      "AWS Glue Data Catalog as central metadata, Glue crawlers on schedule",
      "DocumentDB as catalog with Lambda + cron"
    ],
    correct: 2,
    explanations: [
      "ERRADO. MongoDB próprio é alto overhead de manutenção.",
      "ERRADO. Glue jobs extraindo schema é trabalho manual — não detecta mudanças automaticamente.",
      "CORRETO! Glue Data Catalog é repositório central serverless. Crawlers detectam novos schemas e mudanças automaticamente.",
      "ERRADO. DocumentDB com Lambda customizado tem alto overhead vs. solução nativa."
    ]
  },
  {
    id: 41, domain: 1,
    en: "DynamoDB with provisioned capacity, traffic spikes at midnight then drops. Need to maintain performance and save cost. Which solution?",
    pt: "DynamoDB com capacidade provisionada, picos à meia-noite e queda. Precisa manter performance e economizar. Qual solução?",
    options: [
      "Set provisioned capacity to highest peak demand",
      "Update table class to DynamoDB Standard-IA",
      "Use AWS Application Auto Scaling based on min/max utilization",
      "Switch to on-demand capacity mode"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Manter no pico desperdiça em períodos de baixa.",
      "ERRADO. Standard-IA é para dados raramente acessados — não é solução de scaling.",
      "CORRETO! Application Auto Scaling ajusta capacidade automaticamente conforme uso — performance no pico e economia em baixa demanda.",
      "ERRADO. On-demand é mais caro para tráfego previsível e contínuo."
    ]
  },
  {
    id: 42, domain: 1,
    en: "Migrating Hadoop on-premises to EMR. Want serverless data catalog instead of Hive metastore. MOST cost-effective?",
    pt: "Migrando Hadoop on-premises para EMR. Quer data catalog serverless em vez de Hive metastore. MAIS econômico?",
    options: [
      "Aurora MySQL as external Hive metastore for EMR",
      "Create AWS Glue Data Catalog tables as external Hive metastore for EMR",
      "Migrate Hive metastore to S3 via DMS",
      "Run new Hive metastore on EMR cluster, replicate via DataSync to S3"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Aurora é gerenciado mas tem custo contínuo. Glue Data Catalog é serverless.",
      "CORRETO! Glue Data Catalog é serverless, integra nativamente com EMR como Hive metastore. Sem servidores para gerenciar.",
      "ERRADO. S3 não é metastore — armazena dados, não metadata estruturada.",
      "ERRADO. Hive metastore em cluster EMR é efêmero — perde dados com terminação."
    ]
  },
  {
    id: 43, domain: 1,
    en: "Redshift cluster with KEY distribution. One node has high CPU. Limited budget. How to balance workload without adding nodes?",
    pt: "Cluster Redshift com KEY distribution. Um nó com CPU alta. Orçamento limitado. Como balancear sem adicionar nós?",
    options: [
      "Identify common WHERE column and use as primary key",
      "Scale up the high-CPU node",
      "Identify largest dimension table and alter distribution to EVEN",
      "Use JOIN-condition columns as sort key"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Primary key é para identificação, não distribuição.",
      "ERRADO. Não é possível scaling individual de nó no Redshift — todos têm mesma config.",
      "CORRETO! Mudar tabela com baixa cardinalidade na DIST KEY para EVEN distribui dados uniformemente entre nós.",
      "ERRADO. Sort key acelera filtros (WHERE), não distribui workload."
    ]
  },
  {
    id: 44, domain: 1,
    en: "IoT data in S3 with changing schema. Need cataloging and schema management. MOST cost-effective?",
    pt: "Dados IoT em S3 com schema mutável. Precisa cataloging e gerenciamento de schema. MAIS econômico?",
    options: [
      "Glue Data Catalog + Schema Registry + Lambda + Redshift Data API + Step Functions",
      "Glue Data Catalog + Schema Registry + Glue workflows orchestrating ingestion to Redshift Serverless",
      "Athena workgroup with Spark for S3",
      "Redshift provisioned with Spectrum for S3 and stored procedures"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Lambda + Step Functions adiciona complexidade desnecessária.",
      "CORRETO! Glue Schema Registry gerencia evolução de schema. Glue workflows orquestram ingestão. Redshift Serverless escala sob demanda — totalmente serverless.",
      "ERRADO. Athena Spark não é o mais cost-effective para o caso completo.",
      "ERRADO. Redshift provisionado tem custo fixo — Serverless é mais barato para uso variável."
    ]
  },
  {
    id: 45, domain: 1,
    en: "Log all write operations on source S3 bucket to destination S3 bucket in same region with LEAST effort.",
    pt: "Logar todas as operações de escrita no bucket S3 fonte para outro bucket S3 na mesma região com MENOR esforço.",
    options: [
      "S3 Event Notifications triggering Lambda to log directly to destination S3",
      "CloudTrail with write-only management events filtered by source bucket",
      "CloudTrail trail logging write-only data events from source S3, with filters by bucket Arn",
      "S3 Event triggers Lambda → Firehose → destination S3"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Requer código Lambda customizado — mais esforço.",
      "ERRADO. Management events não capturam operações em objetos (data plane).",
      "CORRETO! CloudTrail data events capturam todas as escritas em objetos S3 e entregam diretamente a outro bucket — sem código.",
      "ERRADO. Firehose adiciona componentes desnecessários — mais complexidade."
    ]
  },
  {
    id: 46, domain: 2,
    en: "Migrate metadata store for Apache Hive to AWS with less operational effort. Hive on EMR. Which solution?",
    pt: "Migrar metadata store para Apache Hive na AWS com menos esforço operacional. Hive em EMR. Qual solução?",
    options: [
      "Use AWS Glue Data Catalog as central metadata repository",
      "Create metastore on Aurora MySQL DB instance",
      "Leverage local Hive metastore on EMR cluster",
      "Provision AWS Lake Formation with EMR"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Glue Data Catalog é serverless e integra nativamente como Hive metastore no EMR — menor overhead operacional.",
      "ERRADO. Aurora exige gerenciar instâncias e backups.",
      "ERRADO. Hive metastore local é efêmero — perde dados quando cluster termina.",
      "ERRADO. Lake Formation é para data lake governance, não para Hive metastore."
    ]
  },
  {
    id: 47, domain: 2,
    en: "S3 data lake using Athena, EMR, Redshift Spectrum. Departments need access to specific rows/columns. LEAST overhead?",
    pt: "Data lake S3 usando Athena, EMR, Redshift Spectrum. Departamentos precisam acesso a linhas/colunas específicas. MENOR overhead?",
    options: [
      "Redshift for data lake with Redshift policies",
      "Apache Ranger via EMR for row/column access. S3 storage. Apache Pig for access",
      "Use S3 + AWS Lake Formation for row/column-level access. Access data via Lake Formation",
      "S3 with bucket policies for row/column restriction"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Redshift policies não controlam acesso a S3 data lake.",
      "ERRADO. Apache Ranger é overhead — Lake Formation oferece o mesmo nativamente.",
      "CORRETO! Lake Formation tem controle granular nativo em row/column level e integra com Athena, EMR, Redshift Spectrum.",
      "ERRADO. S3 bucket policies não suportam row-level access."
    ]
  },
  {
    id: 48, domain: 2,
    en: "Logistics company analyzing transportation data in CSV in S3 via Athena. Two actions to optimize query performance? (Select TWO)",
    pt: "Empresa de logística analisando dados em CSV no S3 via Athena. Duas ações para otimizar performance? (Selecione DUAS)",
    options: [
      "Store CSV in S3 Glacier Instant Retrieval with random prefix",
      "Implement data lake with Lake Formation",
      "Lifecycle to archive older CSV to Glacier",
      "Ensure S3 bucket region matches Athena region (CORRETO)",
      "Reformat CSV to Parquet and use predicate pushdown (CORRETO)"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Glacier Instant Retrieval tem custo de retrieval alto — não otimiza performance.",
      "ERRADO. Lake Formation adiciona complexidade — não otimiza performance diretamente.",
      "ERRADO. Archive não otimiza queries (não pode consultar Glacier diretamente).",
      "CORRETO! Mesma região = sem latência inter-region.",
      "CORRETO! Parquet é colunar (escaneia menos dados) e suporta predicate pushdown — drástica melhoria. NOTA: Marque ambas."
    ]
  },
  {
    id: 49, domain: 2,
    en: "Spike in sales causes RDS SQL Server delays. Write-intensive workload. How to address high CPU? (Select TWO)",
    pt: "Pico em vendas causa atrasos no RDS SQL Server. Workload de escrita intensa. Como resolver alta CPU? (Selecione DUAS)",
    options: [
      "Add more tables and indexes",
      "Transition to DB instance with greater CPU/memory (CORRETO)",
      "Cache database queries",
      "Identify high CPU queries via RDS Performance Insights (CORRETO)",
      "Schedule weekly manual reboots"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Mais índices PIORA escritas — não é solução para write-intensive.",
      "CORRETO! Vertical scaling é solução direta para falta de CPU/memória.",
      "ERRADO. Cache ajuda leituras, não escritas (que é o gargalo aqui).",
      "CORRETO! Performance Insights identifica queries problemáticas para otimização. NOTA: Marque ambas.",
      "ERRADO. Reboots não resolvem alta CPU — só apagam métricas momentaneamente."
    ]
  },
  {
    id: 50, domain: 2,
    en: "Redshift table 2 years of data, interleaved sort key on country_id. Skewed distribution. Which VACUUM?",
    pt: "Tabela Redshift com 2 anos de dados, interleaved sort key em country_id. Distribuição enviesada. Qual VACUUM?",
    options: ["VACUUM REINDEX", "VACUUM DELETE ONLY", "VACUUM SORT ONLY", "VACUUM FULL"],
    correct: 0,
    explanations: [
      "CORRETO! VACUUM REINDEX é específico para interleaved sort keys com distribuição enviesada — re-analisa e re-sorteia colunas.",
      "ERRADO. DELETE ONLY só recupera espaço de linhas deletadas — não corrige sort.",
      "ERRADO. SORT ONLY re-sorteia mas não otimiza interleaved key skew.",
      "ERRADO. FULL é VACUUM padrão — não é específico para interleaved keys."
    ]
  },
  {
    id: 51, domain: 2,
    en: "Gaming company needs streaming player events analysis with single-digit ms query latency. LEAST overhead?",
    pt: "Empresa de games precisa análise de eventos de jogadores em streaming com latência de query single-digit ms. MENOR overhead?",
    options: [
      "Ingest event data to Kinesis Data Streams. Consumer loads results in DynamoDB",
      "Publish to SQS queue + Lambda batch processing",
      "Publish to Aurora Serverless with native SQL queries",
      "Self-managed Apache Kafka on EC2 + Redshift"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Kinesis para streaming + DynamoDB para queries em ms-de-um-dígito — combinação ideal e gerenciada.",
      "ERRADO. SQS introduz delays de fila — não atende latência de ms-de-um-dígito.",
      "ERRADO. Aurora Serverless é relacional — latência maior que DynamoDB para esse caso.",
      "ERRADO. Self-managed Kafka tem alto overhead operacional."
    ]
  },
  {
    id: 52, domain: 2,
    en: "Data lake in S3 with PII. Each user group needs access only to relevant PII. LEAST overhead?",
    pt: "Data lake em S3 com PII. Cada grupo de usuários precisa acesso só ao PII relevante. MENOR overhead?",
    options: [
      "IAM roles with column-level access policies",
      "AWS Glue ETL to Redshift with row-level security",
      "Register S3 in AWS Lake Formation. Use Lake Formation data filters. Query via Athena",
      "Custom Athena UI with Cognito user groups"
    ],
    correct: 2,
    explanations: [
      "ERRADO. IAM não suporta column-level em recursos S3.",
      "ERRADO. ETL para Redshift adiciona movimento de dados e overhead.",
      "CORRETO! Lake Formation oferece data filters granulares (row/column) integrados ao Athena — solução nativa.",
      "ERRADO. UI customizada com Cognito tem alto overhead de desenvolvimento."
    ]
  },
  {
    id: 53, domain: 2,
    en: "Pipeline ingests CSV/JSON/Parquet from 10 sources every 20min, schemas may change. Pipeline must adapt and load to Redshift. Which solutions effective? (Select TWO)",
    pt: "Pipeline ingere CSV/JSON/Parquet de 10 fontes a cada 20min, schemas podem mudar. Pipeline deve se adaptar e carregar no Redshift. Quais efetivas? (Selecione DUAS)",
    options: [
      "Glue workflow every 20min via EventBridge. Crawler detects changes + Spark DataFrame loads to Redshift (CORRETO)",
      "Glue job every 20min via EventBridge Schedule. Spark DataFrame loads to Redshift",
      "Two Lambdas: trigger crawler on S3 upload + Spark DataFrame ETL to Redshift (CORRETO)",
      "EMR cluster with Hive every 20min",
      "Glue workflow via S3 Event + Lambda triggering crawler + Spark DataFrame to Redshift"
    ],
    correct: 0,
    explanations: [
      "CORRETO! EventBridge → Glue Workflow com Crawler (detecta mudanças) + Spark Job (transforma e carrega). Solução adaptável.",
      "ERRADO. Sem Crawler, schema changes não são detectadas automaticamente.",
      "CORRETO! Lambda trigger por S3 upload + crawler + Spark job é arquitetura event-driven adaptável. NOTA: Marque uma das corretas.",
      "ERRADO. EMR + Hive tem overhead de cluster e não detecta schema changes nativamente.",
      "ERRADO. Esta opção mistura conceitos — não é a mais elegante."
    ]
  },
  {
    id: 54, domain: 2,
    en: "Athena queries data in S3 (Glue Data Catalog). Daily refresh of QuickSight dashboards. Reduce Athena query cost with LEAST effort.",
    pt: "Athena consulta S3 (Glue Data Catalog). Dashboards QuickSight atualizam diariamente. Reduzir custo Athena com MENOR esforço.",
    options: [
      "S3 lifecycle to Intelligent Tiering after 30 days",
      "Enable Athena Query Result Caching with 24h cache duration",
      "Activate QuickSight in-memory calculation",
      "Convert S3 data to ORC format"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Lifecycle reduz custo de storage, não custo de query.",
      "CORRETO! Query Result Reuse retorna resultado cacheado para queries idênticas em 24h — sem cobrança de scan adicional.",
      "ERRADO. QuickSight in-memory afeta visualização, mas não reduz queries Athena.",
      "ERRADO. Converter para ORC requer reprocessar todos os dados — alto esforço."
    ]
  },
  {
    id: 55, domain: 2,
    en: "Redshift data warehouse, can't expand cluster (cost). Some tables huge, some small infrequently updated. BEST distribution strategy?",
    pt: "Data warehouse Redshift, não pode expandir (custo). Algumas tabelas enormes, outras pequenas e raramente atualizadas. MELHOR distribuição?",
    options: [
      "Define keys with EVEN distribution across all tables",
      "Change small tables to ALL distribution + define primary/foreign keys (CORRETO)",
      "Change small tables to KEY distribution",
      "Change large tables to ALL distribution"
    ],
    correct: 1,
    explanations: [
      "ERRADO. EVEN não otimiza joins entre tabela fato e dimensão.",
      "CORRETO! ALL distribution copia tabelas pequenas para todos os nós — joins locais sem network shuffle. Ideal para dimensions raramente atualizadas.",
      "ERRADO. KEY distribution em tabelas pequenas pode causar skew e não evita network shuffle de joins.",
      "ERRADO. ALL em tabelas grandes desperdiça storage massivo em todos os nós."
    ]
  },
  {
    id: 56, domain: 2,
    en: "Glue DataBrew converting CSV (Animal_ID, Animal_Name, Status...) to flat JSON (key=column, value=row value). Order doesn't matter. LEAST coding effort?",
    pt: "Glue DataBrew convertendo CSV (Animal_ID, Animal_Name, Status...) para JSON flat (key=coluna, value=valor da linha). Ordem irrelevante. MENOR esforço?",
    options: ["UNNEST_ARRAY transformation", "NEST_TO_ARRAY transformation", "UNNEST_MAP transformation", "NEST_TO_MAP transformation"],
    correct: 3,
    explanations: [
      "ERRADO. UNNEST_ARRAY desfaz array em linhas — direção oposta.",
      "ERRADO. NEST_TO_ARRAY agrupa em array (preserva ordem) — não cria pares key-value JSON.",
      "ERRADO. UNNEST_MAP desfaz map em rows — direção oposta.",
      "CORRETO! NEST_TO_MAP converte colunas em pares key-value (column_name → row_value), perfeito para JSON flat sem importar ordem."
    ]
  },
  {
    id: 57, domain: 2,
    en: "Files with confidential customer info in S3. Need encryption with key control by select employees. LEAST overhead?",
    pt: "Arquivos com info confidencial de clientes em S3. Precisa criptografia com controle de chaves por funcionários selecionados. MENOR overhead?",
    options: [
      "SSE-C with limited key access",
      "SSE-S3 with IAM policy for S3-managed keys",
      "AWS CloudHSM cluster + IAM policy for HSM keys",
      "SSE-KMS with KMS key policies defining who accesses encryption keys"
    ],
    correct: 3,
    explanations: [
      "ERRADO. SSE-C exige cliente fornecer chave a cada request — alto overhead.",
      "ERRADO. SSE-S3 não permite controle granular de chave por usuário.",
      "ERRADO. CloudHSM exige gerenciar HSM — alto overhead operacional.",
      "CORRETO! SSE-KMS com customer-managed key + KMS key policies = controle granular sobre quem usa a chave."
    ]
  },
  {
    id: 58, domain: 2,
    en: "S3 with unpredictable, frequently changing access patterns. Optimize cost while maintaining ms retrieval. LEAST overhead?",
    pt: "S3 com padrões de acesso imprevisíveis. Otimizar custo mantendo retrieval em ms. MENOR overhead?",
    options: [
      "Storage Lens monitor NumberOfObjects, transition to S3 One Zone-IA",
      "Create Intelligent-Tiering Archive configuration with default access tier",
      "Storage Lens monitor BucketSizeBytes, transition to Glacier Deep Archive",
      "Create Intelligent-Tiering Archive configuration with Deep Archive Access tier"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Padrão de acesso varia — automação do Intelligent-Tiering é melhor que decisão manual.",
      "CORRETO! Intelligent-Tiering com default access tier move automaticamente entre Frequent/Infrequent (ambos com acesso em ms) sem overhead manual.",
      "ERRADO. Glacier Deep Archive não retorna em ms — incompatível com requisito.",
      "ERRADO. Deep Archive Access tier também tem retrieval lento — incompatível com ms."
    ]
  },
  {
    id: 59, domain: 2,
    en: "Lambda for ETL with Glue. Need to manage credentials securely. Best practice?",
    pt: "Lambda para ETL com Glue. Precisa gerenciar credenciais com segurança. Melhor prática?",
    options: [
      "AWS Parameter Store with Lambda IAM role",
      "AWS Secrets Manager with Lambda IAM role to retrieve secrets",
      "Pass credentials as job parameters when invoking Lambda",
      "Configuration file in S3 bucket with Lambda access"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Parameter Store funciona, mas Secrets Manager tem rotação automática de credenciais — melhor para segurança.",
      "CORRETO! Secrets Manager + IAM role é melhor prática: armazenamento seguro, rotação automática, audit trail.",
      "ERRADO. Credenciais em parâmetros ficam visíveis em logs e console — inseguro.",
      "ERRADO. Credenciais em arquivo S3 são vulneráveis e difíceis de rotacionar."
    ]
  },
  {
    id: 60, domain: 2,
    en: "Complex weekly Redshift workload: launch cluster, process to S3, terminate. Minimize overhead. Most operational overhead?",
    pt: "Workload Redshift complexo semanal: criar cluster, processar para S3, terminar. Minimizar overhead. MENOR overhead?",
    options: [
      "Run Apache Oozie on EC2",
      "Use Amazon Redshift Serverless for analytics workload",
      "Use Amazon Athena to process workload",
      "Use Amazon Redshift Spectrum"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Oozie em EC2 exige gerenciar Hadoop e instâncias — alto overhead.",
      "CORRETO! Redshift Serverless escala sob demanda, sem provisionar/terminar clusters — zero overhead operacional.",
      "ERRADO. Athena pode não suportar a complexidade analítica de Redshift.",
      "ERRADO. Spectrum requer cluster Redshift ativo — mais overhead que Serverless."
    ]
  },
  {
    id: 61, domain: 2,
    en: "App logs from mobile in S3 via Glue Spark Jobs. QuickSight dashboard slow. Glue jobs scan ALL data each run. Two actions to improve performance? (Select TWO)",
    pt: "Logs de app móvel em S3 via Glue Spark Jobs. Dashboard QuickSight lento. Glue jobs escaneiam TODOS os dados cada execução. Duas ações para melhorar? (Selecione DUAS)",
    options: [
      "Change Glue Jobs execution class to Flex",
      "Change S3 storage class to S3 Express One Zone",
      "Modify Glue Job worker type to larger instance type (CORRETO)",
      "Partition S3 data by year/month/day (CORRETO)",
      "Use DynamicFrame schema class in Glue Spark Jobs"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Flex é para jobs não-urgentes — pode ser interrompido. Não é solução de performance.",
      "ERRADO. Express One Zone é single-AZ — não resolve scan completo.",
      "CORRETO! Worker type maior dá mais CPU/memória — Spark roda mais rápido.",
      "CORRETO! Particionar por data permite predicate pushdown — escaneia só as partições relevantes. NOTA: Marque ambas.",
      "ERRADO. DynamicFrame não evita scan completo por si só."
    ]
  },
  {
    id: 62, domain: 2,
    en: "Stream from medical IoT sensors to Redshift Serverless. Joins streaming with Redshift data, dashboards in near real-time. LEAST overhead?",
    pt: "Stream de sensores médicos IoT para Redshift Serverless. Joins entre streaming e dados Redshift, dashboards em near real-time. MENOR overhead?",
    options: [
      "Aurora ingestion + zero-ETL integration with Redshift",
      "Stage in S3 then COPY to Redshift",
      "Kinesis Data Firehose with Redshift destination",
      "Stream to Redshift via Amazon Redshift Streaming Ingestion"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Aurora não é fonte direta — adiciona componente desnecessário.",
      "ERRADO. Stage em S3 + COPY introduz delay e não é near real-time.",
      "ERRADO. Firehose stage em S3 antes do Redshift — introduz delay.",
      "CORRETO! Streaming Ingestion direto do Kinesis para materialized view no Redshift — near real-time, sem stage intermediário, sem código."
    ]
  },
  {
    id: 63, domain: 2,
    en: "Athena queries delivered to S3 via QuickSight dashboard fail with permission error. What are the underlying reasons? (Select THREE)",
    pt: "Queries Athena entregues a S3 via QuickSight dashboard falham com erro de permissão. Quais as causas subjacentes? (Selecione TRÊS)",
    options: [
      "QuickSight has no configured connection to Athena",
      "QuickSight not authorized to decrypt S3 data (CORRETO)",
      "QuickSight not authorized to access S3 bucket (CORRETO)",
      "Engineer's IAM user lacks read/write access to S3 bucket (CORRETO)",
      "Athena query optimization not configured",
      "Athena tables not properly cataloged"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Conexão Athena-QuickSight é setup inicial — falha de permissão é diferente.",
      "CORRETO! Se S3 está com KMS, QuickSight precisa permissão para decriptar.",
      "CORRETO! QuickSight precisa permissão explícita para acessar o bucket.",
      "CORRETO! IAM do usuário precisa permissões de leitura/escrita no bucket Athena results. NOTA: Marque as três corretas.",
      "ERRADO. Otimização de query não causa erro de permissão.",
      "ERRADO. Catalog não causa erro de permissão — causa erro de schema."
    ]
  },
  {
    id: 64, domain: 2,
    en: "Multiple data sources: RDS PostgreSQL, DynamoDB, S3 + CloudWatch logs. Run SQL across all with minimal overhead. Which solution?",
    pt: "Múltiplas fontes: RDS PostgreSQL, DynamoDB, S3 + CloudWatch logs. SQL através de todas com mínimo overhead. Qual solução?",
    options: [
      "Glue Data Catalog crawl + Redshift Spectrum queries",
      "Glue jobs to ETL all to S3 + Athena query",
      "Glue Data Catalog crawl + Athena with SQL and PartiQL for structured/semi-structured",
      "RDS federated queries + DynamoDB linked servers"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Redshift Spectrum não suporta DynamoDB ou CloudWatch nativamente.",
      "ERRADO. Glue ETL para S3 introduz overhead de movimentação de dados.",
      "CORRETO! Athena Federated Query suporta SQL (estruturado) e PartiQL (semi/não-estruturado) através de Lambda connectors — query única, todas as fontes.",
      "ERRADO. RDS federated queries têm escopo limitado e não acessam DynamoDB."
    ]
  },
  {
    id: 65, domain: 2,
    en: "Glue Interactive Sessions in SageMaker Studio. Engineer denied when starting sessions despite SageMaker IAM role with trust policies. How to resolve?",
    pt: "Glue Interactive Sessions em SageMaker Studio. Engenheiro com erro de permissão ao iniciar sessões apesar do SageMaker IAM role com trust policies. Como resolver?",
    options: [
      "Ensure user has sts:AssumeRole and sagemaker:AddAssociation",
      "Attach AmazonSageMakerFullAccess to SageMaker role",
      "Add AWSGlueServiceRole to engineer's IAM user",
      "Attach AwsGlueSessionUserRestrictedServiceRole to SageMaker execution role"
    ],
    correct: 3,
    explanations: [
      "ERRADO. AssumeRole/AddAssociation não são as permissões específicas para Glue Interactive Sessions.",
      "ERRADO. SageMakerFullAccess é amplo demais e não inclui permissões específicas de Glue Sessions.",
      "ERRADO. Permissão precisa estar no SageMaker execution role, não no IAM user.",
      "CORRETO! AwsGlueSessionUserRestrictedServiceRole é a policy gerenciada específica para Glue Interactive Sessions no SageMaker."
    ]
  }
];
