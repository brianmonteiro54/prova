// Simulado 3 — Baseado em questões reais de prova (65 questões)
// Cobre todos os 4 domínios da certificação AWS DEA-C01

export const simulado3Questions = [
  {
    id: 1, domain: 1,
    en: "Large e-commerce Redshift cluster (300 TB). Long-running query (>2h) blocks short queries. Most cost-effective solution to optimize query execution?",
    pt: "Cluster Redshift grande de e-commerce (300 TB). Query longa (>2h) bloqueia queries curtas. Solução mais econômica para otimizar?",
    options: [
      "Expand number of nodes in Redshift cluster",
      "Enable auto Concurrency Scaling and create distinct WLM queue for long-running query",
      "Adjust WLM to terminate long-running query if exceeds 2 hours",
      "Activate Short Query Acceleration (SQA) for short queries"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Adicionar nós custa caro permanentemente — não é mais econômico.",
      "CORRETO! Concurrency Scaling adiciona capacidade temporariamente. WLM queue separada isola query longa de curtas — paga só pelo extra usado.",
      "ERRADO. Terminar query não otimiza — só evita o problema sem resolvê-lo.",
      "ERRADO. SQA acelera queries curtas mas não resolve o bloqueio causado pela longa."
    ]
  },
  {
    id: 2, domain: 1,
    en: "Tech startup with PII for ML predictive analytics. Data must be encrypted with AWS KMS, PII excluded from ML model. Which steps MOST cost-effective? (Select TWO)",
    pt: "Startup tech com PII para ML predictive analytics. Dados criptografados com AWS KMS, PII excluído do modelo ML. Quais passos MAIS econômicos? (Selecione DUAS)",
    options: [
      "Load data into SageMaker Data Wrangler to encode PII",
      "Deliver data to OpenSearch encrypted with AWS KMS",
      "Use EMR with custom scripts to mask PII",
      "Store data in S3 with AWS KMS server-side encryption (SSE-KMS) (CORRETO)",
      "Implement AWS Glue DataBrew with recipe job to mask PII (CORRETO)"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Encoding em Data Wrangler é transformação para ML, mas modelo ainda usa PII (encoded).",
      "ERRADO. OpenSearch é overkill — apenas para análise/busca, não para entregar a ML.",
      "ERRADO. EMR + scripts customizados é alto overhead.",
      "CORRETO! S3 + SSE-KMS é solução padrão e econômica para criptografia em repouso. NOTA: Marque ambas.",
      "CORRETO! DataBrew tem feature nativa para detecção e mascaramento de PII sem código — econômico."
    ]
  },
  {
    id: 3, domain: 1,
    en: "Kinesis Data Stream consumer on EC2 has ProvisionedThroughputExceededException errors. Which actions resolve this? (Select TWO)",
    pt: "Consumer Kinesis Data Stream em EC2 com erros ProvisionedThroughputExceededException. Quais ações resolvem? (Selecione DUAS)",
    options: [
      "Increase shard count of Kinesis data stream (CORRETO)",
      "Implement exponential backoff and retry logic in application (CORRETO)",
      "Use a larger EC2 instance type",
      "Enable enhanced fan-out functionality on stream",
      "Activate enhanced monitoring on stream"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Mais shards = mais throughput total disponível para consumir.",
      "CORRETO! Exponential backoff lida com throttling temporário sem perder mensagens. NOTA: Marque ambas.",
      "ERRADO. Tamanho da EC2 não muda os limits de throughput por shard.",
      "ERRADO. Enhanced fan-out ajuda quando há muitos consumers, não quando shards estão saturados.",
      "ERRADO. Monitoring observa, não resolve."
    ]
  },
  {
    id: 4, domain: 1,
    en: "Athena queries CSV files in S3, partitioned by date. Athena scans entire table. Reduce data scanned per query?",
    pt: "Athena consulta CSVs no S3, particionado por data. Athena escaneia tabela inteira. Reduzir dados escaneados por query?",
    options: [
      "Execute query in Athena workgroup with per-query control limit",
      "Organize S3 in /year/month/day with PARTITIONED BY in CREATE EXTERNAL TABLE",
      "Divide dataset into compressed Gzip files of 1 GB each",
      "Use Glue Schema Registry to strip unused columns"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Per-query control limit limita consumo, não otimiza scan.",
      "CORRETO! Particionar por ano/mês/dia + PARTITIONED BY permite predicate pushdown — Athena escaneia só a partição relevante.",
      "ERRADO. Gzip reduz storage mas Athena ainda lê todo o arquivo descompactado.",
      "ERRADO. Schema Registry gerencia schemas de streams, não strip de colunas em S3."
    ]
  },
  {
    id: 5, domain: 1,
    en: "Step Functions workflow for data processing tasks in parallel. Which state to use?",
    pt: "Workflow Step Functions para tarefas de processamento em paralelo. Qual state usar?",
    options: ["Parallel", "Choice", "Succeed", "Fail"],
    correct: 0,
    explanations: [
      "CORRETO! Parallel state executa branches simultaneamente e espera todas completarem.",
      "ERRADO. Choice é para branching condicional (if/else), não execução paralela.",
      "ERRADO. Succeed termina o workflow com sucesso.",
      "ERRADO. Fail termina o workflow com falha."
    ]
  },
  {
    id: 6, domain: 1,
    en: "RDS Aurora 15 GB growing 100 GB/day, near real-time predictive analytics needed. LEAST overhead?",
    pt: "RDS Aurora 15 GB crescendo 100 GB/dia, predictive analytics em near real-time. MENOR overhead?",
    options: [
      "Glue for Spark to extract Aurora to Redshift",
      "Data Firehose to stream Aurora to Redshift",
      "Export Aurora to S3 then Athena for analysis",
      "Use zero-ETL integration of Aurora with Redshift"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Glue ETL adiciona pipeline e overhead.",
      "ERRADO. Aurora não é source nativo do Firehose — não é direto.",
      "ERRADO. Export para S3 + Athena introduz delays — não é near real-time.",
      "CORRETO! Zero-ETL replica Aurora para Redshift automaticamente em near real-time, sem pipeline customizado."
    ]
  },
  {
    id: 7, domain: 1,
    en: "Migrate data-processing app on-prem to Lambda. Needs 200 GB reference data shared across all Lambdas. Minimal code changes.",
    pt: "Migrar app de processamento on-prem para Lambda. Precisa 200 GB de dados de referência compartilhados entre Lambdas. Mínimas mudanças de código.",
    options: [
      "Migrate data to EFS, configure each Lambda to mount EFS",
      "Implement OpenSearch cluster + Logstash, modify Lambda to query",
      "Migrate data to S3, Lambda uses S3 API",
      "Store data in Lambda /tmp directory"
    ],
    correct: 0,
    explanations: [
      "CORRETO! EFS pode ser montado em Lambda como sistema de arquivos compartilhado — mínimas mudanças no código existente.",
      "ERRADO. OpenSearch exige mudança total da lógica de acesso aos dados.",
      "ERRADO. S3 API exige reescrever código de acesso a arquivos para SDK.",
      "ERRADO. /tmp tem limite de 10 GB — não cabe 200 GB."
    ]
  },
  {
    id: 8, domain: 1,
    en: "Aurora with Database Activity Streams. Loan status updates trigger different processing systems. Best solution?",
    pt: "Aurora com Database Activity Streams. Atualizações de loan status disparam diferentes sistemas. Melhor solução?",
    options: [
      "RDS event subscription triggers Lambda to send to SQS",
      "EventBridge rule detects loan changes triggering Lambda to SQS",
      "Stored procedure or native function invokes Lambda to forward to SQS for processing",
      "Aurora publishes directly to SNS topic, Lambda subscribes and forwards to SQS"
    ],
    correct: 2,
    explanations: [
      "ERRADO. RDS event subscriptions são para eventos de instância (start/stop), não mudanças de dados.",
      "ERRADO. EventBridge não monitora mudanças de dados em Aurora diretamente.",
      "CORRETO! Aurora MySQL pode invocar Lambda via stored procedures/native functions diretamente quando dados mudam — sem polling.",
      "ERRADO. Aurora não publica diretamente em SNS sem componente intermediário."
    ]
  },
  {
    id: 9, domain: 1,
    en: "Serverless data pipeline with Lambda functions orchestrated by Step Functions. Streaming data processing. Manage with minimal overhead?",
    pt: "Pipeline serverless com Lambdas orquestradas por Step Functions. Processamento de streaming. Gerenciar com mínimo overhead?",
    options: [
      "Use AWS CloudFormation for IaC",
      "Configure SSM to automate management",
      "Use AWS Serverless Application Model (SAM) to define, package, deploy",
      "Leverage AWS CodeBuild"
    ],
    correct: 2,
    explanations: [
      "ERRADO. CloudFormation é mais verboso — SAM é otimizado para serverless.",
      "ERRADO. SSM é para gerenciar instâncias, não deploy de serverless.",
      "CORRETO! SAM é IaC otimizada para serverless: sintaxe simplificada para Lambda, Step Functions, API Gateway, DynamoDB.",
      "ERRADO. CodeBuild é build/test, não IaC para deploy."
    ]
  },
  {
    id: 10, domain: 1,
    en: "Migrate central metadata for Apache Hive to AWS. Multi-team EMR clusters. LEAST overhead?",
    pt: "Migrar metadata central para Apache Hive na AWS. Clusters EMR multi-equipe. MENOR overhead?",
    options: [
      "Athena to query S3 directly with SQL",
      "EMRFS as external metastore for Hive",
      "Glue Data Catalog as external metastore for Hive",
      "EMR notebook to extract Hive metastore"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Athena consulta dados, não substitui metastore.",
      "ERRADO. EMRFS é file system, não metastore.",
      "CORRETO! Glue Data Catalog é serverless, integra nativamente como Hive metastore — menor overhead.",
      "ERRADO. Notebook é para análise, não para hospedar metastore."
    ]
  },
  {
    id: 11, domain: 1,
    en: "Daily air quality data pipeline failing weekly. Implement orchestration with LEAST effort.",
    pt: "Pipeline diário de qualidade do ar falhando semanalmente. Implementar orquestração com MENOR esforço.",
    options: [
      "Step Functions for orchestration + EventBridge for weekly schedule",
      "CodePipeline + EventBridge for weekly schedule",
      "MWAA for orchestration + scheduling",
      "S3 Events trigger Lambda that schedules Glue weekly"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Step Functions + EventBridge é solução serverless padrão para orquestração + agendamento — mínimo esforço.",
      "ERRADO. CodePipeline é CI/CD, não orquestração de pipelines de dados.",
      "ERRADO. MWAA exige criar/manter DAGs em Airflow — mais complexidade.",
      "ERRADO. S3 Events não fornecem scheduling — só reagem a uploads."
    ]
  },
  {
    id: 12, domain: 1,
    en: "Apache Spark interactive analytics on diverse sources, no provisioning. Which solution?",
    pt: "Apache Spark analytics interativo em fontes diversas, sem provisionar. Qual solução?",
    options: ["AWS Glue Studio", "Athena Notebooks", "Athena query editor", "Amazon EMR Studio notebooks"],
    correct: 1,
    explanations: [
      "ERRADO. Glue Studio é para criar jobs ETL, não notebook interativo Spark.",
      "CORRETO! Athena Notebooks suporta Spark interactive sem provisionar cluster — totalmente serverless.",
      "ERRADO. Athena Query Editor é só SQL, não Spark.",
      "ERRADO. EMR Studio notebooks exigem cluster EMR provisionado."
    ]
  },
  {
    id: 13, domain: 1,
    en: "ETL workload using multiple AWS services. Need custom reports of costs/usage to find areas to cut.",
    pt: "Workload ETL usando múltiplos serviços AWS. Precisa relatórios customizados de custos/uso para encontrar áreas para cortar.",
    options: [
      "AWS Budgets with custom budgets and alerts",
      "Amazon QuickSight for visualization",
      "Amazon CloudWatch for usage monitoring",
      "AWS Cost Explorer for customizable cost/usage reports"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Budgets monitora limites de gastos, não fornece análise detalhada.",
      "ERRADO. QuickSight requer importar dados de billing manualmente.",
      "ERRADO. CloudWatch monitora métricas de recursos, não custos detalhados.",
      "CORRETO! Cost Explorer fornece relatórios customizáveis de custos/uso por serviço, conta, tag — análise completa para otimização."
    ]
  },
  {
    id: 14, domain: 1,
    en: "Lambda gets/puts S3 objects with broad policy. Apply least privilege principle. Best modification?",
    pt: "Lambda faz get/put de objetos S3 com policy ampla. Aplicar princípio least privilege. Melhor modificação?",
    options: [
      "Add s3:GetObjectVersion + restrict Resource to bucket/*",
      "Replace Action with [s3:GetObject] and Resource [arn:aws:s3:::bucket/*]",
      "Add s3:ListBucket + Resource arn:aws:s3:::bucket",
      "Replace Action with [s3:PutObject] and Resource [arn:aws:s3:::bucket/*]"
    ],
    correct: 1,
    explanations: [
      "ERRADO. GetObjectVersion não é necessário a menos que use versionamento.",
      "CORRETO! Apenas s3:GetObject (que era a ação realmente necessária) + recurso específico = least privilege.",
      "ERRADO. ListBucket é permissão diferente — não é o que está sendo usado.",
      "ERRADO. PutObject é só upload, não atende quando função precisa ler também."
    ]
  },
  {
    id: 15, domain: 1,
    en: "Glue ETL pipeline pulls from S3, transforms, sends to S3 target. Configure permissions with LEAST effort.",
    pt: "Pipeline Glue ETL puxa de S3, transforma, envia para S3 destino. Configurar permissões com MENOR esforço.",
    options: [
      "S3 ACLs for permissions",
      "Create IAM role with required S3 permissions and assign to Glue",
      "Create IAM user for Glue with policies",
      "S3 bucket policies for Glue access"
    ],
    correct: 1,
    explanations: [
      "ERRADO. S3 ACLs são legacy — IAM roles são prática moderna.",
      "CORRETO! IAM role com policy customizada de S3 (Get/Put nos buckets específicos) = padrão e mínimo esforço.",
      "ERRADO. Glue não usa IAM users — usa roles.",
      "ERRADO. Bucket policies podem complementar, mas a permissão primária é via IAM role."
    ]
  },
  {
    id: 16, domain: 1,
    en: "Redshift cluster slow due to historical data joins. Optimize SQL report combining new + old data.",
    pt: "Cluster Redshift lento devido a joins com dados históricos. Otimizar relatório SQL combinando novos + antigos.",
    options: [
      "UNLOAD sales table to S3 + Spectrum to query both",
      "VACUUM DELETE + COPY data from S3 + adjust report",
      "JOIN with Spectrum + S3 data into new table",
      "Use SQL to retrieve from S3 directly. Save to materialized view. Refresh and extract from view"
    ],
    correct: 3,
    explanations: [
      "ERRADO. UNLOAD move dados — perde a otimização do Redshift Spectrum para junção.",
      "ERRADO. VACUUM DELETE não recupera espaço; COPY introduz overhead.",
      "ERRADO. Spectrum + S3 sem materialized view ainda lê tudo a cada query.",
      "CORRETO! Materialized view armazena resultado pré-computado — drástica redução de tempo em queries repetidas. REFRESH atualiza dados periodicamente."
    ]
  },
  {
    id: 17, domain: 1,
    en: "Daily ETL of small gzip JSON files (<30 MB) from S3. Most cost-effective?",
    pt: "ETL diário de pequenos arquivos gzip JSON (<30 MB) do S3. Mais econômico?",
    options: [
      "Glue Apache Spark with Scala",
      "Glue with Python Shell + pandas for transformation",
      "Glue for Ray with Python scripts",
      "Glue Apache Spark with PySpark"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Spark é overkill para arquivos pequenos — custa mais por DPU.",
      "CORRETO! Glue Python Shell é otimizado para jobs leves (1/16 DPU) — mais barato para arquivos pequenos.",
      "ERRADO. Ray é para parallel computing distribuído — overkill aqui.",
      "ERRADO. Spark + PySpark é caro para arquivos pequenos."
    ]
  },
  {
    id: 18, domain: 1,
    en: "Multiple apps share S3 bucket, policies cause access issues during updates. Centralized solution. LEAST overhead?",
    pt: "Múltiplas apps compartilham bucket S3, policies causam problemas de acesso em atualizações. Solução centralizada. MENOR overhead?",
    options: [
      "Create IAM roles per application",
      "Set up S3 Access Points for each application",
      "Use S3 Object Lock",
      "Use S3 Lifecycle policies"
    ],
    correct: 1,
    explanations: [
      "ERRADO. IAM roles per app exige gerenciar policies separadas — não centraliza acesso ao bucket.",
      "CORRETO! S3 Access Points criam endpoints com policies próprias por app — isolamento sem afetar outros consumers.",
      "ERRADO. Object Lock é para imutabilidade WORM, não para gestão de acesso.",
      "ERRADO. Lifecycle gerencia ciclo de vida de objetos, não acesso."
    ]
  },
  {
    id: 19, domain: 1,
    en: "Daily Redshift load status to track and log. Update DynamoDB. Which solution?",
    pt: "Status diário de carga Redshift para rastrear/logar. Atualizar DynamoDB. Qual solução?",
    options: [
      "CloudTrail capturing Redshift API calls + EventBridge rule + Lambda updating DynamoDB",
      "CloudTrail management events + Lambda writing to DynamoDB",
      "Redshift Event Notifications to monitor table activities",
      "CloudWatch monitoring Redshift cluster + alarm + Lambda writing to DynamoDB"
    ],
    correct: 0,
    explanations: [
      "CORRETO! CloudTrail captura API calls, EventBridge filtra eventos relevantes, Lambda atualiza DynamoDB — orquestração padrão.",
      "ERRADO. Management events não capturam atividade detalhada de carregamento.",
      "ERRADO. Redshift Event Notifications cobre eventos de cluster, não atividade de tabela.",
      "ERRADO. CloudWatch monitora métricas de cluster, não API calls de cargas específicas."
    ]
  },
  {
    id: 20, domain: 1,
    en: "Migrate on-prem NFS data to AWS, share with all Lambdas in NFS file system. Which solution?",
    pt: "Migrar dados NFS on-prem para AWS, compartilhar com todas as Lambdas em sistema de arquivos NFS. Qual solução?",
    options: [
      "Migrate data to Lambda local storage",
      "Migrate to EFS, configure Lambdas to mount EFS",
      "Migrate to EBS volumes, attach to Lambdas",
      "Migrate to FSx for Windows, configure Lambdas to connect"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Lambda local storage é efêmero e por instância — não compartilhado.",
      "CORRETO! EFS é NFS-compatível, pode ser montado em Lambdas como sistema de arquivos compartilhado.",
      "ERRADO. EBS é attach a uma única instância — não compartilhado.",
      "ERRADO. FSx Windows é SMB, não NFS. Outros tipos de FSx (OpenZFS, NetApp) suportam NFS, mas FSx Windows não."
    ]
  },
  {
    id: 21, domain: 1,
    en: "AWS DMS migration of on-prem SQL Server to RDS SQL Server with continuous replication. Which actions? (Select TWO)",
    pt: "Migração AWS DMS de SQL Server on-prem para RDS SQL Server com replicação contínua. Quais ações? (Selecione DUAS)",
    options: [
      "Create DMS task in CHANGE DATA CAPTURE (CDC) only mode",
      "Turn on full transaction log on on-prem SQL Server (CORRETO)",
      "Use AWS SCT to convert source schema",
      "Create AWS DataSync task for one-time transfer",
      "Create DMS task in Full load plus CDC mode (CORRETO)"
    ],
    correct: 1,
    explanations: [
      "ERRADO. CDC only não migra dados existentes — perde estado inicial.",
      "CORRETO! Full transaction log é pré-requisito do CDC para SQL Server.",
      "ERRADO. SCT converte schema entre engines diferentes — SQL Server → SQL Server não precisa.",
      "ERRADO. DataSync transfere arquivos, não dados de banco com replicação.",
      "CORRETO! Full Load + CDC = migração inicial + sincronização contínua. NOTA: Marque ambas."
    ]
  },
  {
    id: 22, domain: 1,
    en: "Run Python every Monday 9 AM UTC to analyze customer behavior in S3. Operational efficiency. Two suitable options? (Select TWO)",
    pt: "Rodar Python toda segunda 9h UTC para analisar comportamento em S3. Eficiência operacional. Duas opções adequadas? (Selecione DUAS)",
    options: [
      "Use EventBridge to execute Python every Monday 9 AM UTC (CORRETO)",
      "Use AWS Cloud9 to write/run/debug",
      "Use AWS CDK to provision via CloudFormation",
      "Use AWS CloudShell to execute",
      "Use AWS Lambda to execute Python (CORRETO)"
    ],
    correct: 0,
    explanations: [
      "CORRETO! EventBridge agenda triggers semanais para Lambda — solução serverless.",
      "ERRADO. Cloud9 é IDE, não executa código agendado em produção.",
      "ERRADO. CDK é IaC, não executa código.",
      "ERRADO. CloudShell é shell interativo, não para execução agendada.",
      "CORRETO! Lambda executa Python serverless. NOTA: Marque ambas (EventBridge + Lambda)."
    ]
  },
  {
    id: 23, domain: 1,
    en: "Non-urgent integration workloads (testing, one-time loads). Spot capacity OK with variable runtimes. Which suitable?",
    pt: "Workloads de integração não-urgentes (testes, cargas únicas). Capacidade spot OK com runtimes variáveis. Qual adequado?",
    options: ["AWS Glue Streaming ETL", "AWS Glue Development Endpoint", "AWS Glue Standard", "AWS Glue Flex"],
    correct: 3,
    explanations: [
      "ERRADO. Streaming ETL é para dados em tempo real, não cargas únicas.",
      "ERRADO. Development Endpoint é para desenvolvimento, descontinuado.",
      "ERRADO. Standard usa hardware dedicado — mais caro.",
      "CORRETO! Glue Flex usa spare capacity — mais barato, runtimes variáveis aceitáveis para jobs não-urgentes."
    ]
  },
  {
    id: 24, domain: 1,
    en: "Hybrid: data in S3 (Athena) + EMR with Spark. Hive on HDFS + Glue Data Catalog. Centralize with LEAST migration effort?",
    pt: "Híbrido: dados em S3 (Athena) + EMR com Spark. Hive em HDFS + Glue Data Catalog. Centralizar com MENOR esforço?",
    options: [
      "Move all S3 to HDFS. Convert Athena to Spark SQL. Use EMRFS",
      "Consolidate to HDFS, transition Athena queries to Presto on EMR",
      "Migrate Hive data to S3 with Glue Data Catalog. Use EMR + Athena for processing",
      "Centralize in S3. Configure EMR to integrate with Glue Data Catalog and adopt Spark SQL for Athena"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Mover tudo para HDFS perde durabilidade do S3.",
      "ERRADO. Migrar para HDFS perde durabilidade.",
      "CORRETO! Migrar Hive de HDFS para S3 + usar Glue Data Catalog centralizado. Athena e EMR consultam o mesmo catálogo — menor esforço, máxima durabilidade.",
      "ERRADO. Não precisa converter queries Athena para Spark SQL — Athena suporta tudo o que precisa."
    ]
  },
  {
    id: 25, domain: 1,
    en: "Glue Crawler in Account A catalog VPC flow logs in Account B's S3. Cross-account requirements? (Select THREE)",
    pt: "Glue Crawler na Conta A para catalogar VPC flow logs em S3 da Conta B. Requisitos cross-account? (Selecione TRÊS)",
    options: [
      "AWS Resource Access Manager to share bucket",
      "IAM role in Account A with permissions to access Account B's bucket (CORRETO)",
      "Direct Connect between accounts",
      "S3 bucket policy in Account B granting access to Account A's IAM role (CORRETO)",
      "Update Glue crawler config to target Account B's bucket (CORRETO)",
      "VPC Endpoint for S3 in Account B"
    ],
    correct: 1,
    explanations: [
      "ERRADO. RAM é para compartilhar recursos AWS específicos, não buckets S3.",
      "CORRETO! IAM role em A com permissão para o bucket de B.",
      "ERRADO. Direct Connect é para conectividade física on-prem-AWS, não cross-account.",
      "CORRETO! Bucket policy em B explicitamente grant access ao role de A.",
      "CORRETO! Crawler precisa apontar para o bucket cross-account. NOTA: Marque as três corretas (B, D, E).",
      "ERRADO. VPC Endpoint é para acesso privado dentro de uma conta."
    ]
  },
  {
    id: 26, domain: 2,
    en: "DynamoDB partition key CATEGORY_NAME causes hot partitions. How to balance throughput?",
    pt: "Partition key CATEGORY_NAME no DynamoDB causa hot partitions. Como balancear?",
    options: [
      "GSI on PRODUCT_NAME",
      "New table DEPARTMENT_ID with general key",
      "New table with more specific key (e.g., PRODUCT_ID)",
      "Local secondary index on PRODUCT_ID"
    ],
    correct: 2,
    explanations: [
      "ERRADO. GSI cria índice secundário, não resolve hot partition na tabela base.",
      "ERRADO. Chave mais geral piora hot partitions.",
      "CORRETO! Chave mais granular (PRODUCT_ID, alta cardinalidade) distribui dados uniformemente entre partições.",
      "ERRADO. LSI compartilha partition key com a tabela base — não resolve."
    ]
  },
  {
    id: 27, domain: 2,
    en: "Redshift slow JOIN between large fact + smaller dimension. Optimal distribution style?",
    pt: "Redshift lento JOIN entre fato grande + dimensão menor. Distribuição ótima?",
    options: [
      "ALL distribution for both tables",
      "EVEN distribution for both",
      "KEY distribution for both based on JOIN columns",
      "KEY for sales (product_id) + ALL for products"
    ],
    correct: 3,
    explanations: [
      "ERRADO. ALL na fato grande copia dados massivos para todos os nós — desperdício.",
      "ERRADO. EVEN não otimiza JOIN — força network shuffle.",
      "ERRADO. KEY para tabela pequena pode causar skew se valores não estão distribuídos.",
      "CORRETO! Fato com KEY (distribui por chave de JOIN) + dimensão com ALL (replica em todos os nós) = JOIN local sem network shuffle."
    ]
  },
  {
    id: 28, domain: 2,
    en: "Redshift in private VPC with column-level security via QuickSight. Connect QuickSight to Redshift. LEAST effort?",
    pt: "Redshift em VPC privada com column-level security via QuickSight. Conectar QuickSight ao Redshift. MENOR esforço?",
    options: [
      "Allow Redshift inbound from QuickSight IP + Direct Connect + route tables",
      "Set up VPC connection in QuickSight + inbound/outbound rules between security groups",
      "Allow outbound to QuickSight IP + VPN + network ACLs",
      "VPC connection + VPC peering + security group rules"
    ],
    correct: 1,
    explanations: [
      "ERRADO. QuickSight IP é dinâmico — Direct Connect é para on-prem.",
      "CORRETO! VPC connection no QuickSight cria ENI na VPC do Redshift. Configurar SG de ambos para permitir tráfego — solução nativa, mínimo esforço.",
      "ERRADO. VPN para QuickSight é over-engineering — não é a forma nativa.",
      "ERRADO. VPC peering é para VPCs diferentes — desnecessário se QuickSight pode usar a mesma VPC."
    ]
  },
  {
    id: 29, domain: 2,
    en: "Migrate on-prem files to S3 data lake via Lake Formation, in near real-time, distributed across S3 buckets. MOST efficient?",
    pt: "Migrar arquivos on-prem para S3 data lake via Lake Formation, near real-time, distribuídos entre buckets S3. MAIS eficiente?",
    options: [
      "AWS Snowcone + S3 Replication Time Control (RTC)",
      "Amazon Data Firehose for streaming to multiple buckets",
      "AWS DataSync for fast transfer to multiple S3 buckets",
      "S3 Batch Operations for bulk distribution"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Snowcone é para volumes pequenos físicos — não atende near real-time.",
      "ERRADO. Firehose é para streaming, não para migração de arquivos.",
      "CORRETO! DataSync é projetado para migração de arquivos on-prem para AWS, suporta múltiplos targets em S3 com transferência rápida e segura.",
      "ERRADO. S3 Batch Operations opera em objetos JÁ no S3, não para upload from on-prem."
    ]
  },
  {
    id: 30, domain: 2,
    en: "Redshift with detailed audit logging of SQL queries, user actions, DB changes. LEAST overhead?",
    pt: "Redshift com audit logging detalhado de queries SQL, ações de usuários, mudanças. MENOR overhead?",
    options: [
      "AWS Config for monitoring Redshift logging features",
      "Parse CloudWatch Logs via Lambda + OpenSearch",
      "CloudWatch Logs integration + alarms + SNS",
      "Enable Redshift's built-in audit logging + integrate with CloudTrail for API tracking"
    ],
    correct: 3,
    explanations: [
      "ERRADO. AWS Config monitora compliance de configuração, não captura queries.",
      "ERRADO. Lambda + OpenSearch é solução customizada — alto overhead.",
      "ERRADO. CloudWatch Logs com alarmes captura logs, mas não tem audit detalhado nativo.",
      "CORRETO! Redshift audit logging nativo captura queries/users/changes. CloudTrail captura API calls. Combinação = overhead mínimo, cobertura completa."
    ]
  },
  {
    id: 31, domain: 2,
    en: "Kinesis Data Stream from sales scaled. ProvisionedThroughputExceededException errors. Real-time processing. Actions? (Select TWO)",
    pt: "Kinesis Data Stream de vendas escalado. Erros ProvisionedThroughputExceededException. Processamento real-time. Ações? (Selecione DUAS)",
    options: [
      "Increase shard count using SplitShard (CORRETO)",
      "Implement Step Scaling on Data Stream",
      "Replace stream with Data Firehose",
      "Enable Enhanced Fan-Out + HTTP/2 retrieval (CORRETO)",
      "Decrease shard count using MergeShard"
    ],
    correct: 0,
    explanations: [
      "CORRETO! SplitShard divide shard em dois — aumenta throughput total.",
      "ERRADO. Step Scaling não existe em Kinesis Data Streams.",
      "ERRADO. Firehose é diferente do Data Streams — perde funcionalidades.",
      "CORRETO! Enhanced Fan-Out dá 2 MB/s dedicado por consumer, evitando saturação. NOTA: Marque ambas.",
      "ERRADO. Diminuir shards piora throughput."
    ]
  },
  {
    id: 32, domain: 2,
    en: "Athena infrequently queries data, want fastest query execution + cost reduction. Best option?",
    pt: "Athena consulta dados infrequentemente, quer execução rápida + redução de custo. Melhor opção?",
    options: [
      "Athena UDFs",
      "Redshift Spectrum",
      "Athena Query Result Reuse",
      "Athena CTAS for pre-aggregation"
    ],
    correct: 2,
    explanations: [
      "ERRADO. UDFs adicionam complexidade — não otimizam custo.",
      "ERRADO. Spectrum exige cluster Redshift — mais caro que Athena.",
      "CORRETO! Query Result Reuse cacheia resultados de queries — execuções subsequentes idênticas são gratuitas e instantâneas.",
      "ERRADO. CTAS pré-computa, mas exige redesign e duplica storage."
    ]
  },
  {
    id: 33, domain: 2,
    en: "Manufacturing IoT data in Timestream + Redshift. Need to join via SQL across both. LEAST overhead?",
    pt: "Dados IoT manufatura em Timestream + Redshift. Join via SQL entre ambos. MENOR overhead?",
    options: [
      "Athena Federated Query across Timestream + Redshift",
      "Export Timestream to S3, COPY to Redshift, query within Redshift",
      "Redshift Spectrum for Timestream",
      "Redshift Federated Query for both"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Athena Federated Query suporta Timestream + Redshift via Lambda connectors — sem mover dados.",
      "ERRADO. Export + COPY tem alto overhead operacional.",
      "ERRADO. Spectrum só consulta S3, não Timestream.",
      "ERRADO. Redshift Federated Query NÃO suporta Timestream."
    ]
  },
  {
    id: 34, domain: 2,
    en: "Glue weekly job, S3 partitions year/month/day daily uploads. Update Glue Data Catalog when new partitions added.",
    pt: "Glue job semanal, partições S3 year/month/day uploads diários. Atualizar Glue Data Catalog quando novas partições adicionadas.",
    options: [
      "Lambda invokes Boto3 create_partition API in Glue",
      "Set enableUpdateCatalog=true in job script",
      "Run MSCK REPAIR TABLE in Athena editor",
      "Daily scheduled Glue crawler"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Lambda chama create_partition imediatamente quando arquivo chega no S3 — partição visível em tempo real.",
      "ERRADO. enableUpdateCatalog atualiza catálogo do OUTPUT do job, não detecta partições no INPUT.",
      "ERRADO. MSCK REPAIR é manual.",
      "ERRADO. Crawler diário tem latência — não é imediato."
    ]
  },
  {
    id: 35, domain: 2,
    en: "Ingest data from external SaaS to S3 then Redshift analysis. LEAST overhead?",
    pt: "Ingerir dados de SaaS externo para S3 e análise Redshift. MENOR overhead?",
    options: ["Amazon AppFlow", "Amazon EventBridge", "Amazon MWAA", "AWS Step Functions"],
    correct: 0,
    explanations: [
      "CORRETO! AppFlow é serviço gerenciado de integração SaaS-AWS sem código.",
      "ERRADO. EventBridge é event bus, não integração SaaS.",
      "ERRADO. MWAA exige criar/manter DAGs.",
      "ERRADO. Step Functions orquestra, não tem connectors SaaS nativos."
    ]
  },
  {
    id: 36, domain: 2,
    en: "Athena query: SELECT campaign, SUM(orders) ... GROUP BY campaign needs filter for >100 orders DESC sort. What to add?",
    pt: "Query Athena: SELECT campaign, SUM(orders) ... GROUP BY campaign precisa filtro >100 orders ordenado DESC. O que adicionar?",
    options: [
      "WHERE orders > 100 before GROUP BY",
      "HAVING SUM(clicks) > 100 after GROUP BY",
      "LIMIT 100 at end",
      "HAVING SUM(orders) > 100 followed by ORDER BY total_orders DESC"
    ],
    correct: 3,
    explanations: [
      "ERRADO. WHERE filtra ANTES de agregação.",
      "ERRADO. Filtra clicks, não orders.",
      "ERRADO. LIMIT limita quantidade de linhas, não filtra valor.",
      "CORRETO! HAVING filtra agregações após GROUP BY. ORDER BY DESC ordena por total."
    ]
  },
  {
    id: 37, domain: 2,
    en: "One-time ad-hoc query for specific Parquet columns from S3 (Glue catalog). Serverless. Best?",
    pt: "Query ad-hoc única para colunas específicas Parquet de S3 (Glue catalog). Serverless. Melhor?",
    options: [
      "S3 Object Lambda access point",
      "Lambda + pandas + SQL SELECT",
      "Glue DataBrew project for column queries",
      "Use Amazon Athena to perform SQL SELECT for specific columns"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Object Lambda é para transformar dados em GET, não query.",
      "ERRADO. Lambda + pandas tem limites de memória/tempo.",
      "ERRADO. DataBrew é para preparação, não query ad-hoc.",
      "CORRETO! Athena é serverless, suporta Parquet (colunar — só lê colunas necessárias), integra com Glue Data Catalog. Ideal para query ad-hoc."
    ]
  },
  {
    id: 38, domain: 2,
    en: "Multi-node Redshift refresh materialized views routinely. MINIMAL overhead?",
    pt: "Cluster Redshift multi-node atualizar materialized views rotineiramente. MÍNIMO overhead?",
    options: [
      "Step Functions for orchestration",
      "Glue workflow to refresh",
      "Lambda UDF to trigger refresh",
      "Scheduled refresh commands using query editor v2"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Step Functions é overkill.",
      "ERRADO. Glue Workflow é para ETL, não refresh interno.",
      "ERRADO. Lambda UDF requer código.",
      "CORRETO! Query Editor v2 tem agendamento nativo de comandos SQL — sem infraestrutura adicional."
    ]
  },
  {
    id: 39, domain: 2,
    en: "Pipeline: Glue job (MySQL → S3) + 3 parallel Lambdas. Orchestrate with LEAST overhead?",
    pt: "Pipeline: Glue job (MySQL → S3) + 3 Lambdas paralelas. Orquestrar com MENOR overhead?",
    options: [
      "Glue workflow",
      "Airflow on EKS",
      "Step Functions state machine for Glue + Lambdas",
      "Airflow on EC2"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Glue Workflow só orquestra Glue jobs/crawlers.",
      "ERRADO. EKS tem alto overhead de Kubernetes.",
      "CORRETO! Step Functions integra Glue + Lambda, suporta Parallel state.",
      "ERRADO. EC2 exige gerenciar instâncias e Airflow."
    ]
  },
  {
    id: 40, domain: 2,
    en: "Catalog system for varied formats + DocumentDB. Auto-update + monitor metadata changes. LEAST overhead?",
    pt: "Sistema catálogo para formatos variados + DocumentDB. Auto-update + monitorar mudanças. MENOR overhead?",
    options: [
      "MongoDB as catalog with Lambda",
      "Glue jobs to extract schema to S3",
      "Glue Data Catalog as central + Glue crawlers scheduled",
      "DocumentDB as catalog with Lambda + cron"
    ],
    correct: 2,
    explanations: [
      "ERRADO. MongoDB próprio é alto overhead.",
      "ERRADO. Glue jobs manual — não detecta mudanças.",
      "CORRETO! Glue Data Catalog serverless + crawlers detectam schemas e mudanças automaticamente.",
      "ERRADO. DocumentDB customizado tem alto overhead."
    ]
  },
  {
    id: 41, domain: 2,
    en: "DynamoDB provisioned, midnight peaks then drops. Maintain performance and save cost?",
    pt: "DynamoDB provisionado, picos meia-noite e queda. Manter performance e economizar?",
    options: [
      "Set capacity to peak",
      "Switch to Standard-IA",
      "Use Application Auto Scaling on min/max utilization",
      "Switch to on-demand"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Pico fixo desperdiça em baixa.",
      "ERRADO. Standard-IA é para dados raros — não é scaling.",
      "CORRETO! Application Auto Scaling ajusta capacidade automaticamente.",
      "ERRADO. On-demand é caro para uso previsível e contínuo."
    ]
  },
  {
    id: 42, domain: 2,
    en: "Hadoop on-prem migration to EMR. Serverless data catalog vs. Hive metastore. MOST cost-effective?",
    pt: "Migração Hadoop on-prem para EMR. Data catalog serverless vs. Hive metastore. MAIS econômico?",
    options: [
      "Aurora MySQL as Hive metastore",
      "Glue Data Catalog as external Hive metastore",
      "S3 via DMS",
      "Hive metastore on EMR + DataSync replication"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Aurora é gerenciado mas custo contínuo.",
      "CORRETO! Glue Data Catalog é serverless, integra como Hive metastore — mais econômico.",
      "ERRADO. S3 não é metastore.",
      "ERRADO. EMR cluster Hive é efêmero — perda quando termina."
    ]
  },
  {
    id: 43, domain: 2,
    en: "Redshift KEY distribution, one node high CPU, limited budget. Balance without adding nodes?",
    pt: "Redshift KEY distribution, um nó CPU alta, orçamento limitado. Balancear sem adicionar nós?",
    options: [
      "Common WHERE column as primary key",
      "Scale up high-CPU node",
      "Identify largest dimension table, change distribution to EVEN",
      "Use JOIN columns as sort key"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Primary key é identificação, não distribuição.",
      "ERRADO. Não pode scaling individual de nó no Redshift.",
      "CORRETO! Mudar tabela com baixa cardinalidade na DIST KEY para EVEN distribui uniformemente.",
      "ERRADO. Sort key é para filtros, não distribuição."
    ]
  },
  {
    id: 44, domain: 2,
    en: "IoT data in S3 with changing schema. Cataloging + schema management. MOST cost-effective?",
    pt: "Dados IoT S3 com schema mutável. Cataloging + schema management. MAIS econômico?",
    options: [
      "Glue Data Catalog + Schema Registry + Lambda + Redshift Data API + Step Functions",
      "Glue Data Catalog + Schema Registry + Glue workflows to Redshift Serverless",
      "Athena workgroup with Spark",
      "Redshift provisioned + Spectrum + stored procedures"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Lambda + Step Functions adiciona complexidade.",
      "CORRETO! Glue Schema Registry + workflows + Redshift Serverless = totalmente serverless, ideal para schema mutável.",
      "ERRADO. Athena Spark não é o mais cost-effective.",
      "ERRADO. Redshift provisionado tem custo fixo."
    ]
  },
  {
    id: 45, domain: 2,
    en: "Log all writes to source S3 to destination S3 same region. LEAST effort?",
    pt: "Logar todas escritas em S3 fonte para S3 destino mesma região. MENOR esforço?",
    options: [
      "S3 Event + Lambda",
      "CloudTrail write-only management events",
      "CloudTrail trail logging write data events from source S3, filtered by Arn, to destination S3",
      "S3 Event + Lambda + Firehose to destination"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Lambda customizado é mais esforço.",
      "ERRADO. Management events não capturam operações em objetos.",
      "CORRETO! CloudTrail data events capturam todas escritas em objetos, entrega direta a outro bucket — sem código.",
      "ERRADO. Firehose adiciona componente desnecessário."
    ]
  },
  {
    id: 46, domain: 2,
    en: "Glue ETL daily exports gzipped JSON (<30 MB) processing. MOST cost-effective?",
    pt: "Glue ETL diário exporta JSON gzip (<30 MB) para processamento. MAIS econômico?",
    options: [
      "Glue Apache Spark with Scala",
      "Glue Python Shell + pandas",
      "Glue for Ray with Python scripts",
      "Glue Apache Spark with PySpark"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Spark é overkill para arquivos pequenos.",
      "CORRETO! Python Shell é otimizado para jobs leves (1/16 DPU) — mais barato.",
      "ERRADO. Ray é para parallel computing distribuído.",
      "ERRADO. Spark/PySpark é caro para arquivos pequenos."
    ]
  },
  {
    id: 47, domain: 3,
    en: "Apps share S3, policies cause access issues during updates. Centralized solution. LEAST overhead?",
    pt: "Apps compartilham S3, policies causam problemas em updates. Solução centralizada. MENOR overhead?",
    options: [
      "IAM roles per app",
      "S3 Access Points per app",
      "S3 Object Lock",
      "S3 Lifecycle"
    ],
    correct: 1,
    explanations: [
      "ERRADO. IAM roles per app não centralizam acesso.",
      "CORRETO! Access Points criam endpoints com policies próprias por app — isolamento.",
      "ERRADO. Object Lock é WORM, não gestão de acesso.",
      "ERRADO. Lifecycle é ciclo de vida, não acesso."
    ]
  },
  {
    id: 48, domain: 3,
    en: "Daily Redshift load status to track. Update DynamoDB. Solution?",
    pt: "Status diário Redshift carga rastreável. Atualizar DynamoDB. Solução?",
    options: [
      "CloudTrail + EventBridge rule + Lambda updating DynamoDB",
      "CloudTrail management events + Lambda",
      "Redshift Event Notifications",
      "CloudWatch + alarm + Lambda"
    ],
    correct: 0,
    explanations: [
      "CORRETO! CloudTrail captura, EventBridge filtra, Lambda atualiza DynamoDB — orquestração padrão.",
      "ERRADO. Management events não capturam atividade detalhada.",
      "ERRADO. Redshift Event Notifications cobre eventos de cluster.",
      "ERRADO. CloudWatch monitora métricas, não API calls."
    ]
  },
  {
    id: 49, domain: 3,
    en: "Migrate on-prem NFS to AWS, NFS share for all Lambdas. Solution?",
    pt: "Migrar NFS on-prem para AWS, NFS share para todas Lambdas. Solução?",
    options: [
      "Lambda local storage",
      "EFS, mount in Lambdas",
      "EBS volumes",
      "FSx for Windows File Server"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Local storage é efêmero por instância.",
      "CORRETO! EFS é NFS compartilhado, montável em Lambdas.",
      "ERRADO. EBS é attach a única instância.",
      "ERRADO. FSx Windows é SMB, não NFS."
    ]
  },
  {
    id: 50, domain: 3,
    en: "DMS migration on-prem SQL Server to RDS SQL Server with continuous replication. Two actions? (Select TWO)",
    pt: "Migração DMS SQL Server on-prem para RDS SQL Server com replicação contínua. Duas ações? (Selecione DUAS)",
    options: [
      "DMS task in CDC only mode",
      "Turn on full transaction log on on-prem (CORRETO)",
      "Use AWS SCT to convert schema",
      "DataSync one-time transfer",
      "DMS task in Full load + CDC mode (CORRETO)"
    ],
    correct: 1,
    explanations: [
      "ERRADO. CDC only não migra dados existentes.",
      "CORRETO! Full transaction log é pré-requisito do CDC para SQL Server.",
      "ERRADO. SCT é para mudança entre engines diferentes.",
      "ERRADO. DataSync transfere arquivos.",
      "CORRETO! Full Load + CDC = migração inicial + sincronização contínua. NOTA: Marque ambas (B e E)."
    ]
  },
  {
    id: 51, domain: 3,
    en: "Run Python every Monday 9 AM UTC for behavior analysis in S3. Two suitable? (Select TWO)",
    pt: "Rodar Python toda segunda 9h UTC para análise de comportamento em S3. Duas adequadas? (Selecione DUAS)",
    options: [
      "EventBridge for scheduling (CORRETO)",
      "Cloud9 for write/run/debug",
      "AWS CDK for IaC",
      "AWS CloudShell to execute",
      "AWS Lambda to execute (CORRETO)"
    ],
    correct: 0,
    explanations: [
      "CORRETO! EventBridge agenda triggers semanais para Lambda.",
      "ERRADO. Cloud9 é IDE.",
      "ERRADO. CDK é IaC, não executa código.",
      "ERRADO. CloudShell é interativo, não scheduled.",
      "CORRETO! Lambda executa Python serverless. NOTA: Marque ambas (A e E)."
    ]
  },
  {
    id: 52, domain: 3,
    en: "Non-urgent integration workloads. Spot capacity OK. Which?",
    pt: "Workloads de integração não-urgentes. Spot capacity OK. Qual?",
    options: ["Glue Streaming ETL", "Glue Development Endpoint", "Glue Standard", "Glue Flex"],
    correct: 3,
    explanations: [
      "ERRADO. Streaming ETL é para tempo real.",
      "ERRADO. Development Endpoint é descontinuado.",
      "ERRADO. Standard é mais caro.",
      "CORRETO! Glue Flex usa spare capacity — mais barato para jobs não-urgentes."
    ]
  },
  {
    id: 53, domain: 3,
    en: "Hybrid: data in S3 (Athena) + EMR with Spark. Hive on HDFS + Glue Data Catalog. Centralize. LEAST migration effort?",
    pt: "Híbrido: dados em S3 (Athena) + EMR Spark. Hive em HDFS + Glue Data Catalog. Centralizar. MENOR esforço?",
    options: [
      "Move S3 to HDFS, convert Athena to Spark SQL",
      "Consolidate to HDFS, transition Athena to Presto",
      "Migrate Hive to S3 with Glue Data Catalog. EMR + Athena process",
      "Centralize in S3. EMR + Glue Data Catalog. Spark SQL for Athena"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Mover para HDFS perde durabilidade.",
      "ERRADO. Migrar para HDFS perde durabilidade.",
      "CORRETO! Migrar Hive para S3 + usar Glue Data Catalog centralizado — Athena e EMR usam o mesmo.",
      "ERRADO. Não precisa converter Athena para Spark SQL."
    ]
  },
  {
    id: 54, domain: 3,
    en: "Glue Crawler in Account A catalog VPC flow logs in Account B's S3. Three actions? (Select THREE)",
    pt: "Glue Crawler na Conta A para catalogar VPC flow logs em S3 da Conta B. Três ações? (Selecione TRÊS)",
    options: [
      "RAM to share bucket",
      "IAM role in A with permissions to B's bucket (CORRETO)",
      "Direct Connect between accounts",
      "Bucket policy in B for A's role (CORRETO)",
      "Update crawler to target B's bucket (CORRETO)",
      "VPC Endpoint in B"
    ],
    correct: 1,
    explanations: [
      "ERRADO. RAM é para recursos AWS específicos, não buckets.",
      "CORRETO! IAM role em A para acessar B.",
      "ERRADO. Direct Connect é on-prem-AWS.",
      "CORRETO! Bucket policy em B grant access ao role de A.",
      "CORRETO! Crawler precisa apontar para o bucket cross-account. NOTA: Marque B, D e E.",
      "ERRADO. VPC Endpoint é privacidade interna."
    ]
  },
  {
    id: 55, domain: 3,
    en: "DynamoDB partition key CATEGORY_NAME causes hot partitions. Balance throughput?",
    pt: "Partition key CATEGORY_NAME no DynamoDB causa hot partitions. Balancear?",
    options: [
      "GSI on PRODUCT_NAME",
      "New table DEPARTMENT_ID general key",
      "New table with specific key (PRODUCT_ID)",
      "LSI on PRODUCT_ID"
    ],
    correct: 2,
    explanations: [
      "ERRADO. GSI é índice secundário, não resolve hot partition base.",
      "ERRADO. Chave geral piora.",
      "CORRETO! Chave granular (PRODUCT_ID, alta cardinalidade) distribui uniformemente.",
      "ERRADO. LSI compartilha partition key da base."
    ]
  },
  {
    id: 56, domain: 3,
    en: "Redshift slow JOIN fact + dimension. Optimal distribution?",
    pt: "Redshift lento JOIN fato + dimensão. Distribuição ótima?",
    options: [
      "ALL for both",
      "EVEN for both",
      "KEY for both on JOIN columns",
      "KEY for sales (product_id) + ALL for products"
    ],
    correct: 3,
    explanations: [
      "ERRADO. ALL na fato grande desperdiça storage.",
      "ERRADO. EVEN força network shuffle.",
      "ERRADO. KEY pode causar skew em pequenas.",
      "CORRETO! Fato KEY (distribui) + dimensão ALL (replica) = JOIN local."
    ]
  },
  {
    id: 57, domain: 3,
    en: "Redshift in private VPC, column-level via QuickSight. Connect QuickSight + Redshift. LEAST effort?",
    pt: "Redshift em VPC privada, column-level via QuickSight. Conectar QuickSight + Redshift. MENOR esforço?",
    options: [
      "Allow Redshift inbound from QuickSight IP + Direct Connect",
      "VPC connection in QuickSight + inbound/outbound between SGs",
      "Allow outbound to QuickSight + VPN",
      "VPC connection + VPC peering"
    ],
    correct: 1,
    explanations: [
      "ERRADO. Direct Connect é on-prem.",
      "CORRETO! VPC connection em QuickSight cria ENI na VPC do Redshift. Configurar SG. Solução nativa.",
      "ERRADO. VPN é over-engineering.",
      "ERRADO. VPC peering é desnecessário se mesma VPC."
    ]
  },
  {
    id: 58, domain: 3,
    en: "Migrate on-prem files to S3 data lake via Lake Formation, near real-time, distributed across S3 buckets. MOST efficient?",
    pt: "Migrar arquivos on-prem para S3 data lake via Lake Formation, near real-time, distribuídos entre buckets. MAIS eficiente?",
    options: [
      "Snowcone + S3 RTC",
      "Data Firehose to multiple buckets",
      "DataSync to multiple S3 buckets",
      "S3 Batch Operations"
    ],
    correct: 2,
    explanations: [
      "ERRADO. Snowcone é físico para volumes pequenos.",
      "ERRADO. Firehose é streaming, não migração de arquivos.",
      "CORRETO! DataSync é para migração de arquivos on-prem-AWS, suporta múltiplos targets em S3.",
      "ERRADO. Batch Operations opera em objetos JÁ no S3."
    ]
  },
  {
    id: 59, domain: 3,
    en: "Redshift detailed audit logging of SQL/users/changes. LEAST overhead?",
    pt: "Redshift audit logging detalhado de SQL/users/mudanças. MENOR overhead?",
    options: [
      "AWS Config for monitoring",
      "Lambda parsing CloudWatch Logs to OpenSearch",
      "CloudWatch + alarms + SNS",
      "Redshift's built-in audit logging + CloudTrail integration"
    ],
    correct: 3,
    explanations: [
      "ERRADO. Config é compliance, não captura queries.",
      "ERRADO. Lambda + OpenSearch é customizado.",
      "ERRADO. CloudWatch sem audit nativo.",
      "CORRETO! Redshift audit logging nativo + CloudTrail = overhead mínimo."
    ]
  },
  {
    id: 60, domain: 3,
    en: "Sales spike, Kinesis Data Stream errors. Real-time. Actions? (Select TWO)",
    pt: "Pico vendas, Kinesis Data Stream erros. Real-time. Ações? (Selecione DUAS)",
    options: [
      "Increase shard count via SplitShard (CORRETO)",
      "Step Scaling on stream",
      "Replace with Firehose",
      "Enhanced Fan-Out + HTTP/2 (CORRETO)",
      "MergeShard"
    ],
    correct: 0,
    explanations: [
      "CORRETO! SplitShard aumenta throughput total.",
      "ERRADO. Step Scaling não existe em Kinesis.",
      "ERRADO. Firehose é diferente do Data Streams.",
      "CORRETO! Enhanced Fan-Out dá 2 MB/s dedicado por consumer. NOTA: Marque ambas (A e D).",
      "ERRADO. Diminuir piora throughput."
    ]
  },
  {
    id: 61, domain: 3,
    en: "Athena infrequent queries, fastest + cost reduction. Best?",
    pt: "Athena queries infrequentes, mais rápido + redução custo. Melhor?",
    options: ["Athena UDFs", "Redshift Spectrum", "Athena Query Result Reuse", "Athena CTAS"],
    correct: 2,
    explanations: [
      "ERRADO. UDFs adicionam complexidade.",
      "ERRADO. Spectrum exige cluster.",
      "CORRETO! Query Result Reuse cacheia — execuções idênticas grátis.",
      "ERRADO. CTAS exige redesign e duplica storage."
    ]
  },
  {
    id: 62, domain: 3,
    en: "Manufacturing IoT data Timestream + Redshift. Join SQL. LEAST overhead?",
    pt: "IoT manufatura Timestream + Redshift. Join SQL. MENOR overhead?",
    options: [
      "Athena Federated Query",
      "Export Timestream to S3, COPY to Redshift",
      "Redshift Spectrum for Timestream",
      "Redshift Federated Query"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Athena Federated Query suporta Timestream + Redshift.",
      "ERRADO. Export + COPY tem alto overhead.",
      "ERRADO. Spectrum só consulta S3.",
      "ERRADO. Redshift Federated Query NÃO suporta Timestream."
    ]
  },
  {
    id: 63, domain: 3,
    en: "Glue weekly job + S3 partitions year/month/day daily. Update Glue catalog when new partition added.",
    pt: "Glue job semanal + partições S3 year/month/day diárias. Atualizar Glue catalog quando partição adicionada.",
    options: [
      "Lambda invokes create_partition API",
      "enableUpdateCatalog=true in script",
      "MSCK REPAIR TABLE in Athena",
      "Daily scheduled Glue crawler"
    ],
    correct: 0,
    explanations: [
      "CORRETO! Lambda chama create_partition imediatamente — partição visível em tempo real.",
      "ERRADO. enableUpdateCatalog atualiza output, não input.",
      "ERRADO. MSCK REPAIR é manual.",
      "ERRADO. Crawler diário tem latência."
    ]
  },
  {
    id: 64, domain: 4,
    en: "Ingest SaaS data to S3 + Redshift analysis. LEAST overhead?",
    pt: "Ingerir dados SaaS para S3 + análise Redshift. MENOR overhead?",
    options: ["AppFlow", "EventBridge", "MWAA", "Step Functions"],
    correct: 0,
    explanations: [
      "CORRETO! AppFlow é gerenciado, sem código, integra SaaS-AWS.",
      "ERRADO. EventBridge é event bus.",
      "ERRADO. MWAA exige DAGs.",
      "ERRADO. Step Functions sem connectors SaaS."
    ]
  },
  {
    id: 65, domain: 4,
    en: "Athena query GROUP BY for top campaigns >100 orders sorted DESC. Add what?",
    pt: "Athena GROUP BY para top campanhas >100 orders DESC. Adicionar?",
    options: [
      "WHERE orders > 100 before GROUP BY",
      "HAVING SUM(clicks) > 100",
      "LIMIT 100",
      "HAVING SUM(orders) > 100 ORDER BY total_orders DESC"
    ],
    correct: 3,
    explanations: [
      "ERRADO. WHERE antes de agregação.",
      "ERRADO. Filtra clicks, não orders.",
      "ERRADO. LIMIT só limita linhas.",
      "CORRETO! HAVING filtra agregação após GROUP BY. ORDER BY DESC ordena."
    ]
  }
];
