import { useState, useEffect, useRef } from "react";

const questions = [
  // ===== DOMAIN 1: Data Ingestion and Transformation (22 questions) =====
  {
    id: 1, domain: 1,
    en: "A company needs to collect clickstream data from its website and deliver it to Amazon S3 in near real-time with minimal operational overhead. The data does not require custom processing before storage. Which service should the company use?",
    pt: "Uma empresa precisa coletar dados de cliques do site e entregar no S3 em quase tempo real com mínimo esforço operacional. Os dados NÃO precisam de processamento customizado antes do armazenamento. Qual serviço usar?",
    options: ["Amazon Kinesis Data Streams", "Amazon Kinesis Data Firehose", "Amazon MSK", "AWS DMS"],
    correct: 1,
    explanations: [
      "ERRADO. Kinesis Data Streams exige que você crie consumers para ler e gravar no S3. Mais trabalho operacional.",
      "CORRETO! Firehose é serverless, entrega dados no S3 em near real-time sem código customizado. 'Near real-time to S3' + 'minimal overhead' = Firehose sempre.",
      "ERRADO. MSK (Kafka gerenciado) é muito mais complexo de operar. Não é 'minimal operational overhead'.",
      "ERRADO. DMS é para migração de bancos de dados, não para coletar clickstream."
    ]
  },
  {
    id: 2, domain: 1,
    en: "A data engineer needs to run complex transformations on terabytes of data stored in S3 using Apache Spark on a nightly schedule. The company wants to optimize costs. Which solution is BEST?",
    pt: "Um engenheiro precisa rodar transformações complexas em terabytes de dados no S3 usando Apache Spark toda noite. A empresa quer otimizar custos. Qual solução é MELHOR?",
    options: ["AWS Lambda", "AWS Glue ETL jobs", "Amazon EMR with Spot Instances", "Amazon Redshift stored procedures"],
    correct: 2,
    explanations: [
      "ERRADO. Lambda tem limite de 15 min e 10 GB de memória. Impossível processar terabytes.",
      "ERRADO. Glue também usa Spark e funcionaria, mas é mais caro que EMR + Spot. Quando pede 'optimize costs' com grande volume, EMR + Spot vence.",
      "CORRETO! EMR com Spot Instances oferece desconto de até 90%. Terabytes + Spark + otimizar custo = EMR + Spot.",
      "ERRADO. Redshift é data warehouse SQL, não processa com Spark."
    ]
  },
  {
    id: 3, domain: 1,
    en: "A company receives data from a third-party SaaS application (Salesforce). They need to transfer this data to Amazon S3 on a scheduled basis without writing custom code. Which service should they use?",
    pt: "Uma empresa recebe dados de um aplicativo SaaS (Salesforce). Precisam transferir para o S3 de forma agendada sem escrever código. Qual serviço usar?",
    options: ["Amazon AppFlow", "AWS DMS", "Amazon Kinesis Data Firehose", "AWS Lambda"],
    correct: 0,
    explanations: [
      "CORRETO! AppFlow transfere dados entre SaaS (Salesforce, Slack, etc.) e AWS sem código, com agendamento.",
      "ERRADO. DMS é para migração de bancos de dados, não para integração com SaaS.",
      "ERRADO. Firehose é para streaming de dados, não para integração com SaaS.",
      "ERRADO. Lambda exigiria escrever código customizado. A questão disse 'without writing custom code'."
    ]
  },
  {
    id: 4, domain: 1,
    en: "A data pipeline processes records from Amazon Kinesis Data Streams. Each record must be processed exactly once, and the pipeline needs to handle duplicate records. Which approach ensures exactly-once processing?",
    pt: "Um pipeline processa registros do Kinesis Data Streams. Cada registro deve ser processado exatamente uma vez, e o pipeline precisa lidar com duplicatas. Qual abordagem garante processamento exactly-once?",
    options: ["Increase the number of shards", "Enable enhanced fan-out", "Use idempotent consumers with checkpointing", "Increase the data retention period"],
    correct: 2,
    explanations: [
      "ERRADO. Mais shards aumentam throughput, não garantem exactly-once processing.",
      "ERRADO. Enhanced fan-out dá throughput dedicado por consumer, não resolve duplicatas.",
      "CORRETO! Consumers idempotentes (que produzem o mesmo resultado se chamados mais de uma vez) + checkpointing (marcar o que já foi processado) garantem exactly-once.",
      "ERRADO. Mais retenção guarda dados por mais tempo, não evita duplicatas."
    ]
  },
  {
    id: 5, domain: 1,
    en: "A data engineer needs to set up a pipeline that automatically starts processing when a new file arrives in an S3 bucket. Which combination of services provides an event-driven trigger?",
    pt: "Um engenheiro precisa configurar um pipeline que inicia automaticamente quando um arquivo novo chega no S3. Qual combinação de serviços fornece um trigger orientado a eventos?",
    options: ["S3 Event Notifications with AWS Lambda", "Amazon CloudWatch scheduled rule with AWS Glue", "AWS DMS with Amazon Redshift", "Amazon SNS with Amazon RDS"],
    correct: 0,
    explanations: [
      "CORRETO! S3 Event Notifications detecta quando um arquivo chega e dispara Lambda automaticamente. É o padrão clássico de event-driven.",
      "ERRADO. CloudWatch scheduled rule é baseado em tempo (cron), não em eventos de arquivo chegando.",
      "ERRADO. DMS é para migração de banco, não para trigger de arquivo no S3.",
      "ERRADO. SNS é para notificações, RDS é banco relacional. Não formam um trigger de S3."
    ]
  },
  {
    id: 6, domain: 1,
    en: "A company has a complex ETL pipeline with multiple dependent steps and branching logic. They need visual monitoring of workflow execution. Which service is BEST suited?",
    pt: "Uma empresa tem um pipeline ETL complexo com múltiplas etapas dependentes e lógica de ramificação. Precisam de monitoramento visual da execução. Qual serviço é MAIS adequado?",
    options: ["Amazon EventBridge", "AWS Glue Workflows", "AWS Step Functions", "Amazon MWAA"],
    correct: 2,
    explanations: [
      "ERRADO. EventBridge dispara ações por eventos/agendamento, não orquestra fluxos complexos com branching.",
      "ERRADO. Glue Workflows orquestra apenas jobs e crawlers do Glue, sem branching logic avançado.",
      "CORRETO! Step Functions tem máquina de estados visual, branching com Choice states, retries, e console visual de monitoramento.",
      "ERRADO. MWAA (Airflow) também orquestra, mas não é serverless e a questão focou em branching logic + visual monitoring, que são pontos fortes do Step Functions."
    ]
  },
  {
    id: 7, domain: 1,
    en: "A data engineer needs to convert CSV files stored in S3 to Apache Parquet format to optimize query performance in Amazon Athena. Which service provides the SIMPLEST way to do this transformation?",
    pt: "Um engenheiro precisa converter arquivos CSV no S3 para Apache Parquet para otimizar queries no Athena. Qual serviço oferece a forma MAIS SIMPLES de fazer essa transformação?",
    options: ["Amazon EMR", "AWS Glue ETL", "Amazon Redshift", "AWS Lambda"],
    correct: 1,
    explanations: [
      "ERRADO. EMR funciona mas requer gerenciar clusters. Não é a forma mais simples.",
      "CORRETO! Glue ETL é serverless e tem suporte nativo para conversão de formatos. Basta configurar source (CSV) e target (Parquet). Mais simples possível.",
      "ERRADO. Redshift é data warehouse. Teria que carregar os dados e depois exportar em Parquet. Over-engineering.",
      "ERRADO. Lambda tem limite de 15 min e memória. Converter grandes volumes de CSV não é ideal para Lambda."
    ]
  },
  {
    id: 8, domain: 1,
    en: "A company uses Amazon MWAA (Apache Airflow) to orchestrate data pipelines. The team needs to trigger a Glue job, wait for completion, and then trigger an Amazon Redshift COPY command. What does MWAA use to define this workflow?",
    pt: "Uma empresa usa MWAA (Apache Airflow) para orquestrar pipelines. A equipe precisa acionar um job Glue, esperar conclusão, e depois acionar um COPY no Redshift. O que o MWAA usa para definir esse workflow?",
    options: ["State machines", "CloudFormation templates", "DAGs (Directed Acyclic Graphs)", "Step Functions workflows"],
    correct: 2,
    explanations: [
      "ERRADO. State machines são do Step Functions, não do Airflow.",
      "ERRADO. CloudFormation é para IaC, não para definir workflows de pipeline.",
      "CORRETO! Airflow usa DAGs (Grafos Acíclicos Direcionados) escritos em Python para definir tarefas e suas dependências.",
      "ERRADO. Step Functions é um serviço separado. MWAA usa DAGs, não Step Functions."
    ]
  },
  {
    id: 9, domain: 1,
    en: "A streaming application uses Amazon Kinesis Data Streams. The data engineer notices that some shards are receiving significantly more data than others, causing processing delays. What is this problem called and how should it be addressed?",
    pt: "Uma aplicação streaming usa Kinesis Data Streams. O engenheiro percebe que alguns shards recebem muito mais dados que outros, causando atrasos. Como se chama esse problema e como resolvê-lo?",
    options: ["Throttling — increase the stream retention period", "Data skew — use a more uniform partition key", "Fan-out — enable enhanced fan-out", "Cold start — increase the number of consumers"],
    correct: 1,
    explanations: [
      "ERRADO. Throttling é quando o serviço limita requisições. Retenção não resolve distribuição desigual.",
      "CORRETO! Data skew (assimetria de dados) ocorre quando a partition key não distribui bem. Usar uma chave mais uniforme resolve o gargalo.",
      "ERRADO. Fan-out é sobre distribuir para múltiplos consumers, não sobre distribuição desigual entre shards.",
      "ERRADO. Cold start é sobre latência de inicialização (Lambda), não sobre distribuição de dados."
    ]
  },
  {
    id: 10, domain: 1,
    en: "A company needs to replicate data in real-time from an Amazon RDS MySQL database to Amazon S3 for analytics purposes. Which service should they use?",
    pt: "Uma empresa precisa replicar dados em tempo real de um banco RDS MySQL para o S3 para análise. Qual serviço usar?",
    options: ["AWS DataSync", "AWS DMS with CDC enabled", "Amazon Kinesis Data Firehose", "AWS Transfer Family"],
    correct: 1,
    explanations: [
      "ERRADO. DataSync transfere arquivos entre storage, não faz CDC de bancos de dados.",
      "CORRETO! DMS com CDC (Change Data Capture) captura mudanças no banco em tempo real e replica para o S3. Perfeito para replicação contínua de banco para S3.",
      "ERRADO. Firehose ingere streams de dados, não se conecta diretamente ao RDS para CDC.",
      "ERRADO. Transfer Family é para SFTP/FTP, não para replicação de banco de dados."
    ]
  },
  {
    id: 11, domain: 1,
    en: "A Lambda function is being throttled when processing messages from an SQS queue during peak hours. What should the data engineer do to resolve this?",
    pt: "Uma função Lambda está sendo throttled ao processar mensagens de uma fila SQS em horários de pico. O que o engenheiro deve fazer?",
    options: ["Increase the SQS message retention period", "Request a Lambda concurrency limit increase", "Switch to Amazon SNS instead of SQS", "Reduce the Lambda function timeout"],
    correct: 1,
    explanations: [
      "ERRADO. Retenção de mensagens no SQS não resolve throttling do Lambda. Só mantém mensagens por mais tempo.",
      "CORRETO! Throttling do Lambda significa que ele atingiu o limite de execuções simultâneas. Solicitar aumento do limite de concorrência resolve.",
      "ERRADO. SNS é pub/sub, não substitui SQS para processamento de filas. Não resolve throttling.",
      "ERRADO. Reduzir timeout não ajuda com throttling. O problema é quantidade de execuções, não duração."
    ]
  },
  {
    id: 12, domain: 1,
    en: "A data engineer needs to define and deploy a serverless data pipeline that includes Lambda functions, a DynamoDB table, and Step Functions. They want to use a framework designed specifically for serverless applications. Which tool should they use?",
    pt: "Um engenheiro precisa definir e fazer deploy de um pipeline serverless com Lambda, DynamoDB e Step Functions. Querem usar um framework específico para aplicações serverless. Qual ferramenta usar?",
    options: ["AWS CloudFormation", "AWS CDK", "AWS SAM", "AWS CodePipeline"],
    correct: 2,
    explanations: [
      "ERRADO. CloudFormation é genérico para toda infraestrutura AWS. Funciona, mas não é específico para serverless.",
      "ERRADO. CDK usa linguagens de programação para IaC. Funciona, mas não é específico para serverless.",
      "CORRETO! SAM (Serverless Application Model) é feito ESPECIFICAMENTE para serverless. Simplifica deploy de Lambda, Step Functions, DynamoDB, API Gateway.",
      "ERRADO. CodePipeline é CI/CD, não define infraestrutura."
    ]
  },
  {
    id: 13, domain: 1,
    en: "A data engineer wants to process streaming data from Amazon MSK, apply windowed aggregations, and write results to Amazon S3. The processing must handle late-arriving data. Which service is BEST for this?",
    pt: "Um engenheiro quer processar dados de streaming do MSK, aplicar agregações com janelas de tempo, e escrever resultados no S3. O processamento deve lidar com dados atrasados. Qual serviço é MELHOR?",
    options: ["AWS Lambda", "Amazon Managed Service for Apache Flink", "AWS Glue Streaming ETL", "Amazon Kinesis Data Firehose"],
    correct: 1,
    explanations: [
      "ERRADO. Lambda não tem suporte nativo para windowed aggregations e late-arriving data.",
      "CORRETO! Apache Flink é especialista em streaming com janelas de tempo, watermarks para dados atrasados, e processamento de eventos complexos.",
      "ERRADO. Glue Streaming funciona para ETL de streaming simples, mas Flink é superior para agregações com janelas e dados atrasados.",
      "ERRADO. Firehose apenas entrega dados, não faz agregações ou processamento complexo."
    ]
  },
  {
    id: 14, domain: 1,
    en: "A company needs to manage fan-out of streaming data where one Kinesis Data Stream needs to be consumed by five different applications simultaneously, each needing dedicated throughput. What feature should be enabled?",
    pt: "Uma empresa precisa gerenciar fan-out de streaming onde um Kinesis Data Stream é consumido por cinco aplicações simultaneamente, cada uma precisando de throughput dedicado. Qual feature habilitar?",
    options: ["Increase shard count", "Enable enhanced fan-out", "Use Kinesis Data Firehose", "Enable server-side encryption"],
    correct: 1,
    explanations: [
      "ERRADO. Mais shards aumentam throughput total, mas os consumers ainda compartilham a capacidade do shard.",
      "CORRETO! Enhanced fan-out dá 2 MB/s de throughput DEDICADO por consumer por shard, usando HTTP/2 push. Perfeito para múltiplos consumers independentes.",
      "ERRADO. Firehose é para entrega para destinos, não para múltiplos consumers customizados.",
      "ERRADO. Encryption é segurança, não tem relação com throughput ou fan-out."
    ]
  },
  {
    id: 15, domain: 1,
    en: "A data engineer is writing SQL queries to transform data in Amazon Redshift. They need to optimize a query that performs a large JOIN between a fact table and a dimension table. What technique should they use?",
    pt: "Um engenheiro escreve queries SQL para transformar dados no Redshift. Precisam otimizar uma query com JOIN grande entre tabela fato e dimensão. Qual técnica usar?",
    options: ["Use a distribution key on the JOIN column", "Convert all tables to JSON format", "Move the data to DynamoDB first", "Use S3 Select to filter the data"],
    correct: 0,
    explanations: [
      "CORRETO! Distribution key na coluna de JOIN faz com que dados relacionados fiquem no mesmo nó, eliminando shuffle entre nós. Otimização clássica do Redshift.",
      "ERRADO. JSON não é formato otimizado para Redshift. Redshift trabalha melhor com formato colunar.",
      "ERRADO. DynamoDB é NoSQL key-value, não faz JOINs SQL. Não faz sentido mover dados para lá.",
      "ERRADO. S3 Select filtra dados no S3, não otimiza JOINs dentro do Redshift."
    ]
  },
  {
    id: 16, domain: 1,
    en: "A data engineer needs to orchestrate a data pipeline that runs every day at 2 AM UTC. The pipeline consists of a single AWS Glue job. What is the SIMPLEST way to schedule this?",
    pt: "Um engenheiro precisa orquestrar um pipeline que roda todo dia às 2h UTC. O pipeline consiste em um único job Glue. Qual é a forma MAIS SIMPLES de agendar?",
    options: ["Amazon MWAA with a DAG", "AWS Step Functions", "Amazon EventBridge scheduled rule", "AWS Lambda with CloudWatch Events"],
    correct: 2,
    explanations: [
      "ERRADO. MWAA é over-engineering para um único job. Airflow é para pipelines complexos com muitas dependências.",
      "ERRADO. Step Functions é para workflows com múltiplas etapas e lógica. Demais para um job só.",
      "CORRETO! EventBridge (antigo CloudWatch Events) com regra cron é a forma mais simples de agendar um job. Uma regra, um target. Simples.",
      "ERRADO. Usar Lambda como intermediário adiciona complexidade desnecessária. EventBridge pode acionar Glue diretamente."
    ]
  },
  {
    id: 17, domain: 1,
    en: "A data engineer is building a batch ingestion pipeline. New data files arrive in S3 once per hour. The engineer needs to track which files have already been processed to avoid reprocessing. Which approach is MOST reliable?",
    pt: "Um engenheiro constrói um pipeline de ingestão batch. Novos arquivos chegam no S3 a cada hora. O engenheiro precisa rastrear quais arquivos já foram processados. Qual abordagem é MAIS confiável?",
    options: ["Delete processed files from S3", "Use AWS Glue job bookmarks", "Rename files after processing", "Use S3 versioning"],
    correct: 1,
    explanations: [
      "ERRADO. Deletar arquivos impede reprocessamento futuro se necessário. Não é boa prática.",
      "CORRETO! Glue job bookmarks rastreiam automaticamente o que já foi processado, evitando duplicação. É a feature nativa do Glue para isso.",
      "ERRADO. Renomear arquivos funciona mas é frágil e difícil de gerenciar em escala.",
      "ERRADO. Versioning mantém versões de objetos, não rastreia o que foi processado."
    ]
  },
  {
    id: 18, domain: 1,
    en: "A company needs to ingest data from an on-premises PostgreSQL database into Amazon S3 as a one-time full load, with no ongoing replication needed. Which is the MOST cost-effective approach?",
    pt: "Uma empresa precisa ingerir dados de um banco PostgreSQL on-premises para o S3 como carga única, sem replicação contínua. Qual abordagem é MAIS econômica?",
    options: ["AWS DMS full load task", "AWS DataSync", "Set up Amazon RDS Read Replica and export", "AWS Snow Family device"],
    correct: 0,
    explanations: [
      "CORRETO! DMS full load (sem CDC) é a forma mais direta e econômica de copiar dados de um banco para S3 uma única vez.",
      "ERRADO. DataSync transfere arquivos, não se conecta diretamente a bancos de dados PostgreSQL.",
      "ERRADO. Criar Read Replica é desnecessário para uma carga única. Mais complexo e caro.",
      "ERRADO. Snow Family é para transferências físicas de petabytes. Over-engineering para uma migração de banco."
    ]
  },
  {
    id: 19, domain: 1,
    en: "A data engineer uses Git for source control of their ETL scripts. They need to create an isolated copy of the main branch to develop a new feature without affecting production. Which Git command should they use?",
    pt: "Um engenheiro usa Git para controle de versão dos scripts ETL. Precisam criar uma cópia isolada da branch principal para desenvolver uma feature sem afetar produção. Qual comando Git usar?",
    options: ["git merge feature", "git clone main", "git checkout -b feature", "git push origin main"],
    correct: 2,
    explanations: [
      "ERRADO. git merge combina branches, não cria uma nova branch isolada.",
      "ERRADO. git clone copia o repositório inteiro, não cria uma branch.",
      "CORRETO! git checkout -b feature cria uma nova branch chamada 'feature' e muda para ela. É a forma padrão de criar branches isoladas.",
      "ERRADO. git push envia mudanças para o repositório remoto, não cria branches."
    ]
  },
  {
    id: 20, domain: 1,
    en: "A data engineer needs to deploy data pipeline infrastructure repeatably across multiple accounts using familiar programming languages like Python, not YAML. Which tool should they use?",
    pt: "Um engenheiro precisa fazer deploy de infraestrutura de pipeline de forma repetível em múltiplas contas usando linguagens como Python, não YAML. Qual ferramenta usar?",
    options: ["AWS CloudFormation", "AWS CDK", "AWS SAM", "AWS CodePipeline"],
    correct: 1,
    explanations: [
      "ERRADO. CloudFormation usa templates YAML/JSON. A questão disse 'not YAML'.",
      "CORRETO! CDK permite definir infraestrutura com Python, TypeScript, Java, etc. É IaC com linguagens de programação.",
      "ERRADO. SAM também usa YAML. É extensão do CloudFormation para serverless.",
      "ERRADO. CodePipeline é CI/CD, não define infraestrutura."
    ]
  },
  {
    id: 21, domain: 1,
    en: "An AWS Glue ETL job is running slower than expected. The source data in S3 contains millions of small files (average 1 KB each). What is the MOST likely cause and solution?",
    pt: "Um job Glue ETL está mais lento que o esperado. Os dados no S3 contêm milhões de arquivos pequenos (média 1 KB). Qual é a causa mais provável e solução?",
    options: ["Insufficient Redshift cluster nodes — add more nodes", "Small files problem — use Glue groupFiles feature", "Incorrect file format — convert to CSV", "S3 bucket in wrong region — move to correct region"],
    correct: 1,
    explanations: [
      "ERRADO. O problema está na leitura dos arquivos pequenos, não no Redshift.",
      "CORRETO! O 'small files problem' causa overhead excessivo ao abrir/fechar milhões de conexões. groupFiles agrupa arquivos pequenos para processamento mais eficiente.",
      "ERRADO. Converter para CSV não resolve o problema de muitos arquivos. O formato não é o problema, a quantidade é.",
      "ERRADO. Região do bucket afeta latência de rede, mas não é a causa principal com milhões de small files."
    ]
  },
  {
    id: 22, domain: 1,
    en: "A company wants to build a CI/CD pipeline to automatically test and deploy their AWS Glue ETL jobs whenever code is pushed to the repository. Which combination of services should they use?",
    pt: "Uma empresa quer construir um pipeline CI/CD para testar e fazer deploy automaticamente dos jobs Glue quando código é enviado ao repositório. Qual combinação de serviços usar?",
    options: ["CodeCommit, CodeBuild, CodePipeline", "S3, Lambda, Step Functions", "CloudFormation, EventBridge, SNS", "Glue Workflows, MWAA, CloudWatch"],
    correct: 0,
    explanations: [
      "CORRETO! CodeCommit (repositório Git), CodeBuild (build/test), CodePipeline (orquestrar CI/CD) é a combinação padrão da AWS para CI/CD.",
      "ERRADO. S3 e Lambda não formam um pipeline CI/CD adequado.",
      "ERRADO. CloudFormation é IaC mas não é um pipeline CI/CD completo.",
      "ERRADO. Esses são serviços de ETL e monitoramento, não de CI/CD."
    ]
  },

  // ===== DOMAIN 2: Data Store Management (17 questions) =====
  {
    id: 23, domain: 2,
    en: "A company stores raw data in S3. Data analysts need to query this data using SQL without loading it into a database. The company wants a serverless solution that minimizes cost. Which solution is BEST?",
    pt: "Uma empresa armazena dados brutos no S3. Analistas precisam consultar com SQL sem carregar em um banco. Querem solução serverless que minimize custo. Qual é MELHOR?",
    options: ["Amazon Redshift Spectrum", "Amazon Athena with Parquet format", "Amazon RDS with data imported from S3", "Amazon EMR with Apache Hive"],
    correct: 1,
    explanations: [
      "ERRADO. Redshift Spectrum precisa de um cluster Redshift ativo (não é serverless). Custo maior.",
      "CORRETO! Athena é 100% serverless, cobra por scan. Parquet reduz o volume escaneado drasticamente = custo mínimo.",
      "ERRADO. RDS exige importar dados (a questão disse 'sem carregar em banco').",
      "ERRADO. EMR requer gerenciar clusters. Não é serverless."
    ]
  },
  {
    id: 24, domain: 2,
    en: "A data engineer has thousands of CSV and JSON files in S3 buckets. The team needs to automatically discover the schema and make metadata available for Athena queries. Which approach should they use?",
    pt: "Um engenheiro tem milhares de CSVs e JSONs no S3. A equipe precisa descobrir o schema automaticamente e disponibilizar metadados para queries no Athena. Qual abordagem usar?",
    options: ["Manually create table definitions in Athena", "Use AWS Glue Crawlers to populate the Glue Data Catalog", "Use Amazon Macie to classify the data", "Use AWS DMS to migrate to RDS"],
    correct: 1,
    explanations: [
      "ERRADO. Criar manualmente para milhares de arquivos não é 'automatically discover'.",
      "CORRETO! Glue Crawlers escaneiam S3 automaticamente, descobrem schemas e criam tabelas no Data Catalog. Athena usa o Data Catalog nativamente.",
      "ERRADO. Macie descobre dados sensíveis (PII), não schemas de dados.",
      "ERRADO. DMS migra bancos, não descobre schemas de arquivos no S3."
    ]
  },
  {
    id: 25, domain: 2,
    en: "A company stores log files in S3 Standard. Logs are accessed frequently for 30 days, rarely for 90 days, and must be deleted after 1 year. How should storage costs be minimized?",
    pt: "Uma empresa armazena logs no S3 Standard. São acessados frequentemente por 30 dias, raramente por 90 dias, e devem ser excluídos após 1 ano. Como minimizar custos?",
    options: ["Move all data to Glacier immediately", "Create S3 Lifecycle policy: Standard-IA after 30d, Glacier after 120d, expire after 365d", "Keep everything in S3 Standard", "Use DynamoDB TTL"],
    correct: 1,
    explanations: [
      "ERRADO. Glacier tem acesso lento. Dados são acessados frequentemente nos primeiros 30 dias.",
      "CORRETO! Lifecycle policy automatiza a transição entre classes conforme o padrão de acesso. Custo otimizado em cada fase.",
      "ERRADO. Pagar preço premium por dados que ninguém acessa não minimiza custos.",
      "ERRADO. Dados estão no S3, não no DynamoDB. TTL é feature do DynamoDB."
    ]
  },
  {
    id: 26, domain: 2,
    en: "A company needs a database for an application with unpredictable traffic, key-value lookups, single-digit millisecond latency, and they want to pay only for what they use. Which service?",
    pt: "Uma empresa precisa de banco para aplicação com tráfego imprevisível, consultas key-value, latência abaixo de 10ms, e pagar apenas pelo uso. Qual serviço?",
    options: ["Amazon RDS for MySQL", "Amazon Redshift Serverless", "Amazon DynamoDB with on-demand capacity", "Amazon Neptune"],
    correct: 2,
    explanations: [
      "ERRADO. RDS requer instância provisionada. Não escala de zero automaticamente.",
      "ERRADO. Redshift é data warehouse para analytics, latência em segundos, não milissegundos.",
      "CORRETO! DynamoDB on-demand: key-value nativo, milissegundos, escala automática, paga por requisição.",
      "ERRADO. Neptune é banco de grafos, não key-value."
    ]
  },
  {
    id: 27, domain: 2,
    en: "A data engineer needs to query data stored in S3 directly from Amazon Redshift WITHOUT loading it into Redshift tables. Which feature should they use?",
    pt: "Um engenheiro precisa consultar dados no S3 diretamente do Redshift SEM carregar em tabelas do Redshift. Qual feature usar?",
    options: ["Amazon Redshift COPY command", "Amazon Redshift Spectrum", "Amazon Redshift federated queries", "Amazon Redshift materialized views"],
    correct: 1,
    explanations: [
      "ERRADO. COPY carrega dados DO S3 PARA tabelas do Redshift. A questão disse 'without loading'.",
      "CORRETO! Spectrum consulta dados no S3 diretamente, sem carregar no Redshift. Usa tabelas externas.",
      "ERRADO. Federated queries consultam outros bancos (RDS, Aurora), não S3.",
      "ERRADO. Materialized views são views pré-computadas de queries, não para acessar S3 diretamente."
    ]
  },
  {
    id: 28, domain: 2,
    en: "A company needs to ensure that items in a DynamoDB table are automatically deleted 90 days after creation. Which feature should they enable?",
    pt: "Uma empresa precisa garantir que itens numa tabela DynamoDB sejam excluídos automaticamente 90 dias após a criação. Qual feature habilitar?",
    options: ["DynamoDB Streams", "DynamoDB TTL (Time to Live)", "DynamoDB Global Tables", "DynamoDB Auto Scaling"],
    correct: 1,
    explanations: [
      "ERRADO. Streams captura mudanças na tabela em tempo real, não exclui itens automaticamente.",
      "CORRETO! TTL define um timestamp de expiração. Quando o tempo passa, DynamoDB exclui o item automaticamente. Perfeito para dados temporários.",
      "ERRADO. Global Tables replica dados entre regiões, não exclui itens.",
      "ERRADO. Auto Scaling ajusta capacidade de leitura/escrita, não exclui dados."
    ]
  },
  {
    id: 29, domain: 2,
    en: "A data engineer is designing a schema for Amazon Redshift. They need to optimize JOIN performance between a large fact table and a smaller dimension table. Which Redshift feature helps the MOST?",
    pt: "Um engenheiro projeta um schema para Redshift. Precisam otimizar JOINs entre uma tabela fato grande e uma dimensão menor. Qual feature ajuda MAIS?",
    options: ["Sort keys on the fact table", "Distribution style KEY on the JOIN column", "Compression encoding on all columns", "Concurrency scaling"],
    correct: 1,
    explanations: [
      "ERRADO. Sort keys otimizam filtros (WHERE) e range scans, não JOINs diretamente.",
      "CORRETO! Distribution KEY na coluna de JOIN coloca dados com a mesma chave no mesmo nó, eliminando shuffle de rede durante o JOIN.",
      "ERRADO. Compression reduz armazenamento e I/O, mas não otimiza JOINs especificamente.",
      "ERRADO. Concurrency scaling adiciona capacidade para múltiplas queries simultâneas, não otimiza um JOIN individual."
    ]
  },
  {
    id: 30, domain: 2,
    en: "A company is migrating a large on-premises Oracle database to Amazon Aurora PostgreSQL. They need to convert the database schema. Which tool should they use?",
    pt: "Uma empresa migra um grande banco Oracle on-premises para Aurora PostgreSQL. Precisam converter o schema do banco. Qual ferramenta usar?",
    options: ["AWS DMS", "AWS SCT (Schema Conversion Tool)", "AWS Glue DataBrew", "Amazon Athena"],
    correct: 1,
    explanations: [
      "ERRADO. DMS migra os DADOS, não converte o SCHEMA (DDL, stored procedures, etc.).",
      "CORRETO! SCT converte schemas de banco entre plataformas diferentes (Oracle → PostgreSQL, SQL Server → MySQL, etc.).",
      "ERRADO. DataBrew é para preparar/limpar dados, não para converter schemas de banco.",
      "ERRADO. Athena é para queries SQL no S3, não para conversão de schemas."
    ]
  },
  {
    id: 31, domain: 2,
    en: "A company needs to move 50 TB of data from Amazon S3 to Amazon Redshift for analytics. What is the MOST efficient method?",
    pt: "Uma empresa precisa mover 50 TB de dados do S3 para o Redshift para analytics. Qual é o método MAIS eficiente?",
    options: ["Use INSERT statements via JDBC", "Use the Redshift COPY command", "Use AWS Glue to transform and load", "Use AWS Lambda to read and insert"],
    correct: 1,
    explanations: [
      "ERRADO. INSERT via JDBC é extremamente lento para 50 TB. Insere linha por linha.",
      "CORRETO! COPY é o comando otimizado do Redshift para carga massiva do S3. Paralelo, rápido, e suporta compressão.",
      "ERRADO. Glue funciona, mas para carga direta do S3 para Redshift, COPY é mais direto e eficiente.",
      "ERRADO. Lambda tem limite de 15 min e memória. Impossível para 50 TB."
    ]
  },
  {
    id: 32, domain: 2,
    en: "A data engineer needs to synchronize new partitions in S3 with the AWS Glue Data Catalog so that Athena queries can access the latest data. What should they do?",
    pt: "Um engenheiro precisa sincronizar novas partições no S3 com o Glue Data Catalog para que queries no Athena acessem os dados mais recentes. O que fazer?",
    options: ["Recreate the Athena table", "Run a Glue Crawler or use MSCK REPAIR TABLE in Athena", "Restart the Athena service", "Update S3 bucket policies"],
    correct: 1,
    explanations: [
      "ERRADO. Recriar a tabela inteira é desnecessário e perde configurações.",
      "CORRETO! Glue Crawler re-escaneia e encontra novas partições. Alternativamente, MSCK REPAIR TABLE no Athena adiciona partições que existem no S3 mas não no catálogo.",
      "ERRADO. Athena é serverless, não tem serviço para reiniciar.",
      "ERRADO. Bucket policies são sobre permissões, não sobre partições."
    ]
  },
  {
    id: 33, domain: 2,
    en: "A company needs to store social network relationship data and frequently query connections between users (friends of friends, shortest path). Which database is BEST suited?",
    pt: "Uma empresa precisa armazenar dados de relacionamento de rede social e consultar conexões entre usuários (amigos de amigos, caminho mais curto). Qual banco é MELHOR?",
    options: ["Amazon DynamoDB", "Amazon RDS", "Amazon Neptune", "Amazon Redshift"],
    correct: 2,
    explanations: [
      "ERRADO. DynamoDB é key-value, não otimizado para queries de relacionamento complexas.",
      "ERRADO. RDS com JOINs recursivos para grafos é muito lento e complexo.",
      "CORRETO! Neptune é banco de GRAFOS, feito para modelar e consultar relacionamentos. Friends-of-friends e shortest-path são queries nativas de grafos.",
      "ERRADO. Redshift é data warehouse para analytics, não para queries de grafos."
    ]
  },
  {
    id: 34, domain: 2,
    en: "A data engineer needs a storage solution for Apache Cassandra workloads on AWS without managing the infrastructure. Which service should they use?",
    pt: "Um engenheiro precisa de uma solução de armazenamento para cargas Apache Cassandra na AWS sem gerenciar infraestrutura. Qual serviço usar?",
    options: ["Amazon DynamoDB", "Amazon Keyspaces", "Amazon DocumentDB", "Amazon MemoryDB"],
    correct: 1,
    explanations: [
      "ERRADO. DynamoDB é NoSQL key-value da AWS, mas não é compatível com Cassandra.",
      "CORRETO! Amazon Keyspaces é o serviço gerenciado compatível com Apache Cassandra. Mesma API CQL, sem gerenciar infra.",
      "ERRADO. DocumentDB é compatível com MongoDB, não Cassandra.",
      "ERRADO. MemoryDB é compatível com Redis, não Cassandra."
    ]
  },
  {
    id: 35, domain: 2,
    en: "A data engineer needs to transfer files from an on-premises SFTP server to Amazon S3 on a regular basis. The existing applications use SFTP protocol and cannot be changed. Which service should they use?",
    pt: "Um engenheiro precisa transferir arquivos de um servidor SFTP on-premises para o S3 regularmente. As aplicações existentes usam protocolo SFTP e não podem ser alteradas. Qual serviço usar?",
    options: ["AWS DataSync", "AWS Transfer Family", "AWS DMS", "Amazon AppFlow"],
    correct: 1,
    explanations: [
      "ERRADO. DataSync transfere arquivos mas usa seu próprio agente, não protocolo SFTP nativo.",
      "CORRETO! Transfer Family fornece endpoints SFTP/FTP/FTPS gerenciados que gravam diretamente no S3. As aplicações continuam usando SFTP sem mudança.",
      "ERRADO. DMS é para migração de bancos de dados, não transferência SFTP.",
      "ERRADO. AppFlow é para integração com SaaS (Salesforce, etc.), não para SFTP."
    ]
  },
  {
    id: 36, domain: 2,
    en: "A company wants to build a data lake on S3 and needs a service to set up security, manage access, and catalog data in a centralized way. Which service should they use?",
    pt: "Uma empresa quer construir um data lake no S3 e precisa de um serviço para configurar segurança, gerenciar acesso e catalogar dados de forma centralizada. Qual serviço usar?",
    options: ["AWS IAM", "AWS Glue", "AWS Lake Formation", "Amazon Macie"],
    correct: 2,
    explanations: [
      "ERRADO. IAM gerencia acesso a serviços AWS, mas não tem funcionalidades específicas de data lake.",
      "ERRADO. Glue tem Data Catalog e ETL, mas não gerencia segurança e governança completa de data lake.",
      "CORRETO! Lake Formation é o serviço completo para data lakes: setup, catalogação, segurança granular (tabela/coluna/linha), e governança centralizada.",
      "ERRADO. Macie descobre dados sensíveis, não configura data lakes."
    ]
  },
  {
    id: 37, domain: 2,
    en: "A data engineer needs to handle schema evolution in their data lake. New columns are frequently added to data files. Which file format handles schema evolution MOST gracefully?",
    pt: "Um engenheiro precisa lidar com evolução de schema no data lake. Novas colunas são adicionadas frequentemente. Qual formato de arquivo lida MELHOR com evolução de schema?",
    options: ["CSV", "Fixed-width text files", "Apache Avro", "Plain JSON"],
    correct: 2,
    explanations: [
      "ERRADO. CSV não tem schema embutido. Adicionar colunas pode quebrar leitores que esperam formato fixo.",
      "ERRADO. Arquivos de largura fixa são os piores para evolução de schema.",
      "CORRETO! Avro tem schema embutido no arquivo e suporte nativo para evolução de schema (adicionar/remover campos com valores default). Muito usado em streaming.",
      "ERRADO. JSON é flexível mas não tem controle de schema formal. Avro é mais robusto para evolução controlada."
    ]
  },
  {
    id: 38, domain: 2,
    en: "A Redshift cluster needs to export query results to S3 for downstream processing. Which command should be used?",
    pt: "Um cluster Redshift precisa exportar resultados de queries para o S3 para processamento posterior. Qual comando usar?",
    options: ["COPY", "UNLOAD", "INSERT INTO S3", "EXPORT"],
    correct: 1,
    explanations: [
      "ERRADO. COPY carrega dados DO S3 PARA o Redshift (direção oposta).",
      "CORRETO! UNLOAD exporta resultados de queries DO Redshift PARA o S3. É o par do COPY.",
      "ERRADO. INSERT INTO S3 não é um comando válido do Redshift.",
      "ERRADO. EXPORT não é um comando do Redshift."
    ]
  },
  {
    id: 39, domain: 2,
    en: "A data engineer wants to query data in Amazon RDS PostgreSQL directly from Amazon Redshift without copying the data. Which Redshift feature enables this?",
    pt: "Um engenheiro quer consultar dados no RDS PostgreSQL diretamente do Redshift sem copiar os dados. Qual feature do Redshift permite isso?",
    options: ["Redshift Spectrum", "Redshift federated queries", "Redshift materialized views", "Redshift COPY command"],
    correct: 1,
    explanations: [
      "ERRADO. Spectrum consulta dados no S3, não em RDS.",
      "CORRETO! Federated queries permitem consultar RDS e Aurora diretamente do Redshift, sem mover dados.",
      "ERRADO. Materialized views armazenam resultados pré-computados, não conectam a bancos externos.",
      "ERRADO. COPY carrega dados para dentro do Redshift, não consulta externamente."
    ]
  },

  // ===== DOMAIN 3: Data Operations and Support (14 questions) =====
  {
    id: 40, domain: 3,
    en: "A data engineer must ensure that all API calls in the AWS account are recorded for audit purposes. Which service should they use?",
    pt: "Um engenheiro deve garantir que todas as chamadas de API na conta AWS sejam registradas para auditoria. Qual serviço usar?",
    options: ["Amazon CloudWatch Logs", "AWS CloudTrail", "AWS Config", "Amazon Macie"],
    correct: 1,
    explanations: [
      "ERRADO. CloudWatch Logs armazena logs de aplicação, não registra chamadas de API automaticamente.",
      "CORRETO! CloudTrail registra TODAS as chamadas de API na conta: quem, quando, de onde, o que mudou.",
      "ERRADO. Config monitora mudanças de configuração nos recursos, não chamadas de API.",
      "ERRADO. Macie descobre dados sensíveis no S3, nada a ver com API calls."
    ]
  },
  {
    id: 41, domain: 3,
    en: "A data engineer needs to profile data, check for missing values, and define data quality rules without writing code. Which service meets these requirements?",
    pt: "Um engenheiro precisa analisar perfil dos dados, verificar valores ausentes e definir regras de qualidade sem escrever código. Qual serviço atende?",
    options: ["Amazon Athena", "AWS Glue ETL", "AWS Glue DataBrew", "Amazon SageMaker"],
    correct: 2,
    explanations: [
      "ERRADO. Athena faz queries SQL, requer código SQL. Não tem interface visual de profiling.",
      "ERRADO. Glue ETL requer código PySpark/Scala.",
      "CORRETO! DataBrew é visual, sem código. Faz profiling, detecta valores ausentes, define regras de qualidade.",
      "ERRADO. SageMaker é para Machine Learning, fora do escopo da prova."
    ]
  },
  {
    id: 42, domain: 3,
    en: "A data engineer needs to set up an alarm that sends an email when a Glue job fails. Which combination of services should they use?",
    pt: "Um engenheiro precisa configurar um alarme que envia email quando um job Glue falha. Qual combinação de serviços usar?",
    options: ["CloudWatch Alarms + Amazon SNS", "AWS Config + Amazon SES", "CloudTrail + Lambda", "EventBridge + SQS"],
    correct: 0,
    explanations: [
      "CORRETO! CloudWatch monitora métricas do Glue, Alarms detectam falhas, SNS envia email de notificação. Combinação clássica de monitoramento + alerta.",
      "ERRADO. Config é para compliance de configuração. SES é para email marketing/transacional.",
      "ERRADO. CloudTrail registra API calls, não monitora falhas de jobs diretamente.",
      "ERRADO. SQS é fila de mensagens, não envia emails. E EventBridge sozinho não monitora métricas do Glue."
    ]
  },
  {
    id: 43, domain: 3,
    en: "A data engineer wants to run interactive SQL queries to explore large log datasets stored in S3. They want a serverless solution. Which service should they use?",
    pt: "Um engenheiro quer rodar queries SQL interativas para explorar grandes datasets de logs no S3. Querem solução serverless. Qual serviço usar?",
    options: ["Amazon Redshift", "Amazon Athena", "Amazon EMR", "Amazon RDS"],
    correct: 1,
    explanations: [
      "ERRADO. Redshift requer cluster provisionado (não é serverless no sentido tradicional).",
      "CORRETO! Athena é serverless, faz queries SQL diretamente no S3, paga por scan. Perfeito para explorar logs.",
      "ERRADO. EMR requer gerenciar clusters. Não é serverless.",
      "ERRADO. RDS é banco relacional provisionado. Exigiria carregar os logs primeiro."
    ]
  },
  {
    id: 44, domain: 3,
    en: "A data pipeline runs nightly but has been failing intermittently. The engineer needs to analyze CloudWatch Logs to find error patterns. Which tool provides the FASTEST way to query logs?",
    pt: "Um pipeline roda toda noite mas falha intermitentemente. O engenheiro precisa analisar CloudWatch Logs para encontrar padrões de erro. Qual ferramenta é a MAIS RÁPIDA para consultar logs?",
    options: ["Export logs to S3 and query with Athena", "Use CloudWatch Logs Insights", "Set up Amazon OpenSearch Service", "Download logs and search manually"],
    correct: 1,
    explanations: [
      "ERRADO. Exportar para S3 + Athena funciona mas é mais demorado de configurar.",
      "CORRETO! CloudWatch Logs Insights permite consultar logs diretamente no CloudWatch com linguagem de query própria. Mais rápido e direto.",
      "ERRADO. OpenSearch é poderoso para análise de logs, mas precisa configurar cluster. Não é o mais rápido para investigação pontual.",
      "ERRADO. Busca manual não é escalável nem eficiente."
    ]
  },
  {
    id: 45, domain: 3,
    en: "A company needs to create interactive dashboards for business users to visualize sales data stored in Amazon Redshift. Which AWS service should they use?",
    pt: "Uma empresa precisa criar dashboards interativos para usuários de negócio visualizarem dados de vendas no Redshift. Qual serviço AWS usar?",
    options: ["Amazon Athena", "Amazon Managed Grafana", "Amazon QuickSight", "AWS Glue DataBrew"],
    correct: 2,
    explanations: [
      "ERRADO. Athena é para queries SQL, não para criar dashboards visuais.",
      "ERRADO. Grafana é mais para monitoramento de infraestrutura e métricas operacionais.",
      "CORRETO! QuickSight é a ferramenta de BI da AWS para criar dashboards interativos. Conecta direto ao Redshift.",
      "ERRADO. DataBrew é para preparar/limpar dados, não para dashboards."
    ]
  },
  {
    id: 46, domain: 3,
    en: "A data engineer notices that an Amazon Athena query scanning a large S3 dataset is very expensive. The data is in CSV format. What should they do to reduce costs?",
    pt: "Um engenheiro percebe que uma query Athena escaneando um grande dataset no S3 é muito cara. Os dados estão em CSV. O que fazer para reduzir custos?",
    options: ["Increase Athena query timeout", "Convert data to Parquet format and partition by frequently filtered columns", "Move data to Amazon RDS", "Enable S3 Transfer Acceleration"],
    correct: 1,
    explanations: [
      "ERRADO. Timeout não afeta custo. Athena cobra por dados escaneados, não por tempo.",
      "CORRETO! Parquet é colunar (escaneia só colunas necessárias) e comprimido (menos bytes). Particionar permite pular partições inteiras. Ambos reduzem dados escaneados = menos custo.",
      "ERRADO. Migrar para RDS perde os benefícios serverless do Athena e pode ser mais caro.",
      "ERRADO. Transfer Acceleration é para uploads, não afeta custo de queries."
    ]
  },
  {
    id: 47, domain: 3,
    en: "A data engineer needs to automate a process that: (1) triggers when a file lands in S3, (2) runs a Lambda to validate the file, (3) starts a Glue job if valid, (4) sends notification when complete. Which service orchestrates this?",
    pt: "Um engenheiro precisa automatizar: (1) trigger quando arquivo chega no S3, (2) Lambda valida o arquivo, (3) inicia job Glue se válido, (4) envia notificação ao completar. Qual serviço orquestra isso?",
    options: ["Amazon EventBridge only", "AWS Step Functions", "AWS Glue Workflows", "Amazon SQS"],
    correct: 1,
    explanations: [
      "ERRADO. EventBridge pode iniciar o processo, mas não orquestra múltiplas etapas com lógica condicional.",
      "CORRETO! Step Functions orquestra cada etapa: S3 Event → Lambda (validação) → Choice state (if/else) → Glue job → SNS notification. Fluxo completo com lógica.",
      "ERRADO. Glue Workflows só orquestra jobs e crawlers do Glue, não Lambda e SNS.",
      "ERRADO. SQS é fila de mensagens, não orquestra workflows."
    ]
  },
  {
    id: 48, domain: 3,
    en: "An Amazon EMR cluster is experiencing performance issues. The data engineer suspects data skew in Spark jobs. What should they check FIRST?",
    pt: "Um cluster EMR está com problemas de performance. O engenheiro suspeita de data skew nos jobs Spark. O que verificar PRIMEIRO?",
    options: ["The number of EC2 instances in the cluster", "The Spark UI to check partition sizes and task durations", "The S3 bucket permissions", "The VPC security group rules"],
    correct: 1,
    explanations: [
      "ERRADO. Mais instâncias não resolve skew. As partições desiguais continuariam sobrecarregando nós específicos.",
      "CORRETO! Spark UI mostra tamanho de cada partição e duração de cada task. Se algumas tasks demoram muito mais que outras, é data skew.",
      "ERRADO. Permissões de bucket não causam problemas de performance por skew.",
      "ERRADO. Security groups controlam rede, não performance de processamento."
    ]
  },
  {
    id: 49, domain: 3,
    en: "A data engineer needs to run data quality checks that verify: no null values in the ID column, all dates are valid, and amounts are positive. Where should these rules be defined?",
    pt: "Um engenheiro precisa rodar verificações de qualidade: sem nulos na coluna ID, datas válidas, e valores positivos. Onde definir essas regras?",
    options: ["Amazon Redshift constraints", "AWS Glue Data Quality rules", "Amazon CloudWatch Alarms", "AWS Config rules"],
    correct: 1,
    explanations: [
      "ERRADO. Redshift constraints funcionam, mas não verificam dados no pipeline antes de carregar.",
      "CORRETO! Glue Data Quality permite definir regras (completeness, validity, custom checks) que rodam durante o processamento ETL.",
      "ERRADO. CloudWatch monitora métricas de infraestrutura, não qualidade de dados.",
      "ERRADO. Config verifica configuração de recursos AWS, não qualidade de dados."
    ]
  },
  {
    id: 50, domain: 3,
    en: "A company uses AWS Glue for ETL. A job that previously worked is now failing with an out-of-memory error. What should the engineer do FIRST?",
    pt: "Uma empresa usa Glue para ETL. Um job que funcionava agora falha com erro de memória. O que o engenheiro deve fazer PRIMEIRO?",
    options: ["Rewrite the job in Amazon Redshift SQL", "Increase the number of DPUs (Data Processing Units) for the Glue job", "Switch to Amazon EMR", "Reduce the Glue job timeout"],
    correct: 1,
    explanations: [
      "ERRADO. Reescrever em Redshift é mudança drástica. Não é o primeiro passo.",
      "CORRETO! DPUs são as unidades de processamento do Glue (memória + CPU). Aumentar DPUs dá mais memória ao job. É a solução mais direta para out-of-memory.",
      "ERRADO. Migrar para EMR é over-engineering como primeiro passo. Tente aumentar DPUs antes.",
      "ERRADO. Timeout é tempo máximo de execução, não memória."
    ]
  },
  {
    id: 51, domain: 3,
    en: "A data engineer wants to analyze VPC Flow Logs and application logs stored in S3 to identify security patterns. They need near real-time search and visualization. Which service is BEST?",
    pt: "Um engenheiro quer analisar VPC Flow Logs e logs de aplicação no S3 para identificar padrões de segurança. Precisa de busca e visualização quase em tempo real. Qual serviço é MELHOR?",
    options: ["Amazon Athena", "Amazon OpenSearch Service", "AWS CloudTrail", "Amazon QuickSight"],
    correct: 1,
    explanations: [
      "ERRADO. Athena faz queries pontuais, mas não tem busca e visualização em tempo real nativos.",
      "CORRETO! OpenSearch (antigo Elasticsearch) é especialista em busca e análise de logs em tempo real, com dashboards (Kibana/OpenSearch Dashboards) incluídos.",
      "ERRADO. CloudTrail registra API calls, não analisa padrões em logs.",
      "ERRADO. QuickSight é BI para dashboards de negócio, não análise de logs de segurança em tempo real."
    ]
  },
  {
    id: 52, domain: 3,
    en: "A data engineer uses Amazon MWAA (Airflow) to orchestrate ETL pipelines. A DAG is failing at a specific task. Where should the engineer look to troubleshoot?",
    pt: "Um engenheiro usa MWAA (Airflow) para orquestrar pipelines ETL. Uma DAG falha em uma tarefa específica. Onde o engenheiro deve procurar para investigar?",
    options: ["AWS CloudTrail events", "Airflow task logs in CloudWatch Logs", "S3 server access logs", "Amazon Redshift query logs"],
    correct: 1,
    explanations: [
      "ERRADO. CloudTrail registra API calls, não logs de execução de tarefas do Airflow.",
      "CORRETO! MWAA envia logs das tarefas para CloudWatch Logs. Cada task tem logs detalhados de execução, erros e stack traces.",
      "ERRADO. S3 access logs registram acessos ao bucket, não erros de tarefas Airflow.",
      "ERRADO. Redshift query logs são do Redshift, não do Airflow."
    ]
  },
  {
    id: 53, domain: 3,
    en: "A company wants to use Athena notebooks with Apache Spark to interactively explore and transform data. What capability does this provide?",
    pt: "Uma empresa quer usar notebooks Athena com Apache Spark para explorar e transformar dados interativamente. Que capacidade isso fornece?",
    options: ["Real-time streaming processing", "Interactive data exploration with Spark without managing clusters", "Machine learning model training", "Database migration capabilities"],
    correct: 1,
    explanations: [
      "ERRADO. Athena Spark notebooks são para exploração interativa, não streaming em tempo real.",
      "CORRETO! Athena Spark notebooks permitem usar Spark interativamente (explorar, transformar, visualizar) sem precisar gerenciar clusters EMR. Serverless.",
      "ERRADO. ML está fora do escopo. Athena Spark é para data exploration.",
      "ERRADO. Migração de banco é DMS, não Athena."
    ]
  },

  // ===== DOMAIN 4: Data Security and Governance (12 questions) =====
  {
    id: 54, domain: 4,
    en: "A company stores sensitive data in S3 encrypted with SSE-KMS. They need to audit every use of the encryption key. Which service provides this audit trail?",
    pt: "Uma empresa armazena dados sensíveis no S3 com SSE-KMS. Precisam auditar cada uso da chave de criptografia. Qual serviço fornece essa trilha de auditoria?",
    options: ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "Amazon Macie"],
    correct: 1,
    explanations: [
      "ERRADO. CloudWatch monitora métricas e logs, não uso de chaves KMS.",
      "CORRETO! Toda chamada ao KMS (encrypt, decrypt, etc.) é registrada no CloudTrail. É a auditoria completa de uso de chaves.",
      "ERRADO. Config monitora configuração de recursos, não uso de chaves.",
      "ERRADO. Macie descobre dados sensíveis, não audita chaves de criptografia."
    ]
  },
  {
    id: 55, domain: 4,
    en: "A data engineer needs to store database credentials that are automatically rotated every 30 days. Which service should they use?",
    pt: "Um engenheiro precisa armazenar credenciais de banco de dados que são rotacionadas automaticamente a cada 30 dias. Qual serviço usar?",
    options: ["AWS Systems Manager Parameter Store", "AWS Secrets Manager", "AWS KMS", "IAM User access keys"],
    correct: 1,
    explanations: [
      "ERRADO. Parameter Store armazena parâmetros mas NÃO tem rotação automática nativa de credenciais de banco.",
      "CORRETO! Secrets Manager armazena credenciais E rotaciona automaticamente (integração nativa com RDS, Redshift, etc.).",
      "ERRADO. KMS gerencia chaves de CRIPTOGRAFIA, não credenciais de banco.",
      "ERRADO. IAM access keys são para acesso à API AWS, não para credenciais de banco. E não tem rotação automática."
    ]
  },
  {
    id: 56, domain: 4,
    en: "A company has a data lake with multiple teams needing different column-level access to the same tables. Which service provides centralized permission management for the data lake?",
    pt: "Uma empresa tem data lake com múltiplas equipes precisando de acesso a colunas diferentes das mesmas tabelas. Qual serviço gerencia permissões centralizadas?",
    options: ["IAM policies", "S3 bucket policies", "AWS Lake Formation", "Amazon Redshift GRANT statements"],
    correct: 2,
    explanations: [
      "ERRADO. IAM não entende colunas de tabelas. Opera no nível de serviço/recurso.",
      "ERRADO. Bucket policies controlam acesso a arquivos/pastas, não a colunas específicas.",
      "CORRETO! Lake Formation gerencia permissões no nível de tabela, coluna e linha do data lake. Centralizado para todas as equipes.",
      "ERRADO. Redshift GRANT funciona só dentro do Redshift, não para todo o data lake."
    ]
  },
  {
    id: 57, domain: 4,
    en: "A data engineer must encrypt data at rest in Amazon S3 using keys that the company manages, with automatic annual rotation and full audit trail. Which approach is correct?",
    pt: "Um engenheiro deve criptografar dados em repouso no S3 usando chaves que a empresa gerencia, com rotação automática anual e trilha de auditoria completa. Qual abordagem é correta?",
    options: ["SSE-S3", "SSE-KMS with customer managed key", "SSE-C", "Client-side encryption"],
    correct: 1,
    explanations: [
      "ERRADO. SSE-S3 usa chaves gerenciadas pela AWS. Empresa não tem controle.",
      "CORRETO! SSE-KMS com CMK: empresa gerencia a chave, rotação automática anual, e CloudTrail registra todo uso.",
      "ERRADO. SSE-C: empresa fornece chave a cada request. Sem rotação automática nem auditoria AWS.",
      "ERRADO. Client-side: complexo demais. Empresa precisa gerenciar tudo. Sem rotação automática AWS."
    ]
  },
  {
    id: 58, domain: 4,
    en: "A company needs to identify personally identifiable information (PII) stored across multiple S3 buckets automatically. Which service should they use?",
    pt: "Uma empresa precisa identificar dados pessoais (PII) armazenados em múltiplos buckets S3 automaticamente. Qual serviço usar?",
    options: ["AWS Config", "Amazon GuardDuty", "Amazon Macie", "AWS CloudTrail"],
    correct: 2,
    explanations: [
      "ERRADO. Config verifica configuração de recursos, não conteúdo de dados.",
      "ERRADO. GuardDuty detecta ameaças de segurança, não PII em arquivos.",
      "CORRETO! Macie usa ML para escanear S3 e descobrir PII automaticamente (CPFs, emails, cartões, etc.).",
      "ERRADO. CloudTrail registra API calls, não analisa conteúdo de dados."
    ]
  },
  {
    id: 59, domain: 4,
    en: "A data engineer needs to ensure that a Lambda function can read from a specific S3 bucket and write to a DynamoDB table, but have NO other permissions. Which principle should guide the IAM policy?",
    pt: "Um engenheiro precisa que Lambda leia de um bucket S3 específico e escreva em uma tabela DynamoDB, sem NENHUMA outra permissão. Qual princípio guia a política IAM?",
    options: ["Use AWS managed AdminAccess policy", "Apply the principle of least privilege with a custom policy", "Use the root account credentials", "Attach multiple broad policies"],
    correct: 1,
    explanations: [
      "ERRADO. AdminAccess dá acesso TOTAL a tudo. Extremamente perigoso e viola least privilege.",
      "CORRETO! Least privilege: criar política customizada com APENAS s3:GetObject no bucket específico e dynamodb:PutItem na tabela específica. Nada mais.",
      "ERRADO. NUNCA use root account para aplicações. É a pior prática de segurança.",
      "ERRADO. Múltiplas políticas amplas dão mais permissão que o necessário. Viola least privilege."
    ]
  },
  {
    id: 60, domain: 4,
    en: "A company needs to ensure that data stored in Amazon Redshift is encrypted and that connections to the cluster use SSL/TLS. What does encryption in transit protect against?",
    pt: "Uma empresa precisa que dados no Redshift sejam criptografados e conexões usem SSL/TLS. Contra o que a criptografia em trânsito protege?",
    options: ["Unauthorized access to stored data on disk", "Data being intercepted while traveling over the network", "Users querying data without permission", "Data loss due to hardware failure"],
    correct: 1,
    explanations: [
      "ERRADO. Isso é encryption at REST (em repouso), não em trânsito.",
      "CORRETO! Encryption in transit (SSL/TLS) protege dados enquanto viajam pela rede, impedindo interceptação (man-in-the-middle).",
      "ERRADO. Isso é autorização (IAM policies, GRANT), não criptografia.",
      "ERRADO. Isso é durabilidade/backup, não criptografia."
    ]
  },
  {
    id: 61, domain: 4,
    en: "A security team wants to monitor and be alerted when any configuration change occurs in their AWS resources (e.g., S3 bucket policy modified, security group changed). Which service should they use?",
    pt: "A equipe de segurança quer monitorar e receber alertas quando qualquer mudança de configuração ocorrer nos recursos AWS. Qual serviço usar?",
    options: ["AWS CloudTrail", "AWS Config", "Amazon Macie", "Amazon GuardDuty"],
    correct: 1,
    explanations: [
      "ERRADO. CloudTrail registra API calls, mas Config é específico para mudanças de CONFIGURAÇÃO.",
      "CORRETO! AWS Config monitora configuração dos recursos continuamente. Pode definir regras e alertar quando configurações mudam ou violam compliance.",
      "ERRADO. Macie é para descobrir dados sensíveis em S3.",
      "ERRADO. GuardDuty detecta ameaças de segurança (ataques), não mudanças de configuração."
    ]
  },
  {
    id: 62, domain: 4,
    en: "A data engineer needs to ensure data in an S3 bucket cannot be replicated to regions outside of South America to comply with data sovereignty requirements. What should they configure?",
    pt: "Um engenheiro precisa garantir que dados em um bucket S3 NÃO possam ser replicados para regiões fora da América do Sul por compliance de soberania de dados. O que configurar?",
    options: ["S3 Object Lock", "S3 bucket policy with region condition and SCP (Service Control Policy)", "S3 versioning", "S3 Transfer Acceleration"],
    correct: 1,
    explanations: [
      "ERRADO. Object Lock impede deleção/modificação de objetos, não controla replicação entre regiões.",
      "CORRETO! Bucket policy com condição de região + SCP (na AWS Organizations) bloqueiam replicação para regiões não autorizadas. Data sovereignty requer controle de onde dados podem existir.",
      "ERRADO. Versioning mantém versões de objetos, não controla regiões.",
      "ERRADO. Transfer Acceleration acelera uploads, não controla regiões de replicação."
    ]
  },
  {
    id: 63, domain: 4,
    en: "A data engineer needs to query AWS CloudTrail logs stored in S3 using SQL to investigate a security incident. Which service enables this MOST efficiently?",
    pt: "Um engenheiro precisa consultar logs do CloudTrail armazenados no S3 usando SQL para investigar um incidente de segurança. Qual serviço permite isso de forma MAIS eficiente?",
    options: ["Amazon Redshift", "Amazon Athena", "Amazon RDS", "AWS Glue ETL"],
    correct: 1,
    explanations: [
      "ERRADO. Redshift requer carregar os dados primeiro. Demais para investigação pontual.",
      "CORRETO! Athena consulta dados no S3 diretamente com SQL. CloudTrail logs no S3 + Athena = análise rápida de incidentes. Também pode usar CloudTrail Lake.",
      "ERRADO. RDS exigiria importar os logs. Over-engineering.",
      "ERRADO. Glue é para transformação ETL, não para queries interativas de investigação."
    ]
  },
  {
    id: 64, domain: 4,
    en: "A company shares Amazon Redshift data with a partner company in a different AWS account. They need to share specific tables without copying data. Which feature should they use?",
    pt: "Uma empresa compartilha dados do Redshift com um parceiro em outra conta AWS. Precisam compartilhar tabelas específicas sem copiar dados. Qual feature usar?",
    options: ["Redshift UNLOAD to S3 and share bucket", "Redshift data sharing", "AWS DMS replication", "Redshift cross-region snapshots"],
    correct: 1,
    explanations: [
      "ERRADO. UNLOAD + compartilhar bucket funciona, mas copia dados. A questão disse 'without copying data'.",
      "CORRETO! Redshift data sharing permite que outra conta acesse tabelas diretamente sem copiar dados. Compartilhamento em tempo real, sem duplicação.",
      "ERRADO. DMS replica dados (cria cópia). Não é compartilhamento sem cópia.",
      "ERRADO. Snapshots são backups. Criam cópia dos dados."
    ]
  },
  {
    id: 65, domain: 4,
    en: "A data engineer is creating a VPC for their data pipeline infrastructure. They need to allow a Glue job running in the VPC to access S3 without going through the public internet. Which should they configure?",
    pt: "Um engenheiro cria uma VPC para infraestrutura de pipeline. Precisam que um job Glue na VPC acesse S3 sem passar pela internet pública. O que configurar?",
    options: ["Internet Gateway", "NAT Gateway", "S3 VPC Gateway Endpoint", "AWS Direct Connect"],
    correct: 2,
    explanations: [
      "ERRADO. Internet Gateway dá acesso à internet pública. A questão disse 'sem internet pública'.",
      "ERRADO. NAT Gateway permite acesso à internet de subnets privadas. Ainda passa pela internet.",
      "CORRETO! VPC Gateway Endpoint para S3 cria conexão privada entre VPC e S3. Tráfego fica na rede AWS, sem internet pública. Gratuito!",
      "ERRADO. Direct Connect é conexão física dedicada entre on-premises e AWS. Over-engineering para acessar S3 da VPC."
    ]
  }
];

const domainNames = {
  1: "Data Ingestion & Transformation",
  2: "Data Store Management",
  3: "Data Operations & Support",
  4: "Data Security & Governance"
};

const domainColors = {
  1: "#FF9900",
  2: "#00A1C9",
  3: "#7B61FF",
  4: "#E63946"
};

export default function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);
  const explanationRef = useRef(null);

  const q = questions[currentQ];
  const totalCorrect = Object.values(answers).filter(a => a.correct).length;
  const progress = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setAnswers(prev => ({
      ...prev,
      [q.id]: { selected: idx, correct: idx === q.correct }
    }));
    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setAnswers({});
    setShowResults(false);
  };

  const getDomainStats = (domain) => {
    const domainQs = questions.filter(q => q.domain === domain);
    const correct = domainQs.filter(q => answers[q.id]?.correct).length;
    return { total: domainQs.length, correct, pct: Math.round((correct / domainQs.length) * 100) };
  };

  if (!started) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1a 0%, #1a1f35 50%, #0d1525 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 20 }}>
        <div style={{ textAlign: "center", maxWidth: 600 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>☁️</div>
          <h1 style={{ color: "#FF9900", fontSize: 32, margin: "0 0 8px", fontWeight: 800, letterSpacing: -1 }}>AWS DEA-C01</h1>
          <h2 style={{ color: "#e2e8f0", fontSize: 20, margin: "0 0 24px", fontWeight: 400 }}>Simulado Completo — 65 Questões</h2>
          <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, margin: "0 0 16px" }}>
            Questões em <strong style={{ color: "#e2e8f0" }}>inglês e português</strong> com explicações detalhadas de cada alternativa.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "24px 0", textAlign: "left" }}>
            {[1,2,3,4].map(d => (
              <div key={d} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${domainColors[d]}` }}>
                <div style={{ color: domainColors[d], fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Domínio {d}</div>
                <div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 4 }}>{domainNames[d]}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{questions.filter(q => q.domain === d).length} questões</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,153,0,0.1)", border: "1px solid rgba(255,153,0,0.3)", borderRadius: 10, padding: 14, margin: "20px 0", textAlign: "left" }}>
            <span style={{ color: "#FF9900", fontWeight: 700, fontSize: 13 }}>💡 DICA:</span>
            <span style={{ color: "#cbd5e1", fontSize: 13 }}> Nota mínima: 720/1000 (~72%). Não perde ponto por errar — chute se não souber!</span>
          </div>
          <button onClick={() => setStarted(true)} style={{ background: "linear-gradient(135deg, #FF9900, #e68a00)", color: "#000", border: "none", borderRadius: 12, padding: "16px 48px", fontSize: 18, fontWeight: 700, cursor: "pointer", transition: "transform 0.2s", letterSpacing: 0.5 }}
            onMouseOver={e => e.target.style.transform = "scale(1.05)"}
            onMouseOut={e => e.target.style.transform = "scale(1)"}>
            Começar Simulado
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const pct = Math.round((totalCorrect / questions.length) * 100);
    const passed = pct >= 72;
    const scaledScore = Math.round(100 + (pct / 100) * 900);
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1a 0%, #1a1f35 50%, #0d1525 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 20 }}>
        <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>{passed ? "🎉" : "💪"}</div>
            <h1 style={{ color: passed ? "#22c55e" : "#E63946", fontSize: 28, margin: "0 0 8px" }}>
              {passed ? "APROVADO!" : "NÃO PASSOU (ainda!)"}
            </h1>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>
              {passed ? "Você está pronto para a prova!" : "Continue estudando, você está quase lá!"}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Acertos</div>
              <div style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 800 }}>{totalCorrect}/{questions.length}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Percentual</div>
              <div style={{ color: pct >= 72 ? "#22c55e" : "#E63946", fontSize: 28, fontWeight: 800 }}>{pct}%</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Score Estimado</div>
              <div style={{ color: scaledScore >= 720 ? "#22c55e" : "#E63946", fontSize: 28, fontWeight: 800 }}>{scaledScore}</div>
            </div>
          </div>

          <h3 style={{ color: "#e2e8f0", fontSize: 16, marginBottom: 12 }}>Resultado por Domínio</h3>
          {[1,2,3,4].map(d => {
            const stats = getDomainStats(d);
            return (
              <div key={d} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 14, marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ color: domainColors[d], fontSize: 13, fontWeight: 600 }}>D{d}: {domainNames[d]}</span>
                  <span style={{ color: stats.pct >= 72 ? "#22c55e" : "#E63946", fontSize: 13, fontWeight: 700 }}>{stats.correct}/{stats.total} ({stats.pct}%)</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 6, overflow: "hidden" }}>
                  <div style={{ background: stats.pct >= 72 ? "#22c55e" : "#E63946", height: "100%", width: `${stats.pct}%`, borderRadius: 4, transition: "width 1s" }} />
                </div>
              </div>
            );
          })}

          <div style={{ background: "rgba(255,153,0,0.1)", border: "1px solid rgba(255,153,0,0.3)", borderRadius: 10, padding: 14, margin: "20px 0" }}>
            <div style={{ color: "#FF9900", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>📌 Foque nos domínios mais fracos!</div>
            <div style={{ color: "#cbd5e1", fontSize: 13 }}>
              {[1,2,3,4].map(d => getDomainStats(d)).sort((a,b) => a.pct - b.pct)[0].pct < 72
                ? `Revise o domínio com menor percentual antes da prova.`
                : `Ótimo desempenho! Revise o vocabulário em inglês para garantir.`}
            </div>
          </div>

          <button onClick={handleRestart} style={{ width: "100%", background: "linear-gradient(135deg, #FF9900, #e68a00)", color: "#000", border: "none", borderRadius: 12, padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            Refazer Simulado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1a 0%, #1a1f35 50%, #0d1525 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "16px 16px 80px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#FF9900", fontSize: 13, fontWeight: 700 }}>AWS DEA-C01</span>
            <span style={{ color: "#475569", fontSize: 13 }}>|</span>
            <span style={{ color: domainColors[q.domain], fontSize: 12, fontWeight: 600, background: `${domainColors[q.domain]}15`, padding: "2px 8px", borderRadius: 4 }}>
              D{q.domain}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 600 }}>✓ {totalCorrect}</span>
            <span style={{ color: "#E63946", fontSize: 13, fontWeight: 600 }}>✗ {Object.keys(answers).length - totalCorrect}</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 4, height: 4, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ background: "#FF9900", height: "100%", width: `${progress}%`, borderRadius: 4, transition: "width 0.5s" }} />
        </div>

        {/* Question Number */}
        <div style={{ color: "#64748b", fontSize: 13, marginBottom: 12 }}>
          Questão <strong style={{ color: "#e2e8f0" }}>{currentQ + 1}</strong> de {questions.length}
        </div>

        {/* Question EN */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, marginBottom: 10, borderLeft: `3px solid ${domainColors[q.domain]}` }}>
          <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>🇺🇸 English</div>
          <div style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.6 }}>{q.en}</div>
        </div>

        {/* Question PT */}
        <div style={{ background: "rgba(255,153,0,0.05)", borderRadius: 12, padding: 16, marginBottom: 20, borderLeft: "3px solid rgba(255,153,0,0.4)" }}>
          <div style={{ color: "#FF9900", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>🇧🇷 Português</div>
          <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>{q.pt}</div>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map((opt, idx) => {
            let bg = "rgba(255,255,255,0.04)";
            let border = "1px solid rgba(255,255,255,0.1)";
            let icon = String.fromCharCode(65 + idx);
            let iconBg = "rgba(255,255,255,0.08)";
            let iconColor = "#94a3b8";
            let textColor = "#cbd5e1";

            if (answered) {
              if (idx === q.correct) {
                bg = "rgba(34,197,94,0.12)";
                border = "1px solid rgba(34,197,94,0.4)";
                icon = "✓";
                iconBg = "rgba(34,197,94,0.2)";
                iconColor = "#22c55e";
                textColor = "#e2e8f0";
              } else if (idx === selected) {
                bg = "rgba(230,57,70,0.12)";
                border = "1px solid rgba(230,57,70,0.4)";
                icon = "✗";
                iconBg = "rgba(230,57,70,0.2)";
                iconColor = "#E63946";
                textColor = "#94a3b8";
              } else {
                textColor = "#64748b";
              }
            }

            return (
              <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                style={{ background: bg, border, borderRadius: 10, padding: "12px 14px", cursor: answered ? "default" : "pointer", display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", transition: "all 0.2s" }}>
                <div style={{ minWidth: 28, height: 28, borderRadius: 7, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: iconColor, flexShrink: 0 }}>
                  {icon}
                </div>
                <span style={{ color: textColor, fontSize: 14, lineHeight: 1.5, paddingTop: 3 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div ref={explanationRef} style={{ marginTop: 20 }}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ color: selected === q.correct ? "#22c55e" : "#E63946", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
                {selected === q.correct ? "✅ Correto!" : "❌ Errado!"}
              </div>
              {q.explanations.map((exp, idx) => (
                <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "8px 10px", borderRadius: 8, background: idx === q.correct ? "rgba(34,197,94,0.08)" : "transparent" }}>
                  <span style={{ color: idx === q.correct ? "#22c55e" : "#64748b", fontWeight: 700, fontSize: 13, minWidth: 20 }}>
                    {String.fromCharCode(65 + idx)})
                  </span>
                  <span style={{ color: idx === q.correct ? "#cbd5e1" : "#64748b", fontSize: 13, lineHeight: 1.6 }}>{exp}</span>
                </div>
              ))}
            </div>

            <button onClick={handleNext}
              style={{ width: "100%", marginTop: 16, background: "linear-gradient(135deg, #FF9900, #e68a00)", color: "#000", border: "none", borderRadius: 12, padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "transform 0.2s" }}
              onMouseOver={e => e.target.style.transform = "scale(1.02)"}
              onMouseOut={e => e.target.style.transform = "scale(1)"}>
              {currentQ < questions.length - 1 ? `Próxima Questão →` : "Ver Resultado Final 🏆"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
