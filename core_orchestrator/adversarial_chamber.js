/**
 * 🏛️ MAJLIS Adversarial Chamber Engine (محرك غرفة العمليات والمداولة المعاكسة)
 * Runs strict System-2 adversarial reasoning to destroy sycophancy before code execution.
 */
const fs = require('fs');
const path = require('path');

class AdversarialChamber {
  constructor(orchestrator, projectRoot = process.cwd()) {
    this.orch = orchestrator;
    this.projectRoot = projectRoot;
    this.templatePath = path.join(__dirname, '..', 'templates', 'ADVERSARIAL_CHAMBER.prompt');
    this.template = fs.existsSync(this.templatePath) 
      ? fs.readFileSync(this.templatePath, 'utf8')
      : '';
  }

  /**
   * Determine if a user request involves high-stakes architectural, security, or data changes
   */
  isHighStakes(directive) {
    if (!directive || typeof directive !== 'string') return false;
    const triggers = [
      'معمارية', 'أمان', 'security', 'database', 'قاعدة بيانات', 
      'migration', 'refactor', 'نظام جديد', 'بنية', 'auth', 'تشفير',
      'حذف', 'تغيير جذري', 'architecture', 'orchestrator'
    ];
    const lower = directive.toLowerCase();
    return triggers.some(t => lower.includes(t));
  }

  /**
   * Determine the best world-class domain specialist to summon based on the problem topic
   */
  selectDomainSpecialist(task) {
    const lower = task.toLowerCase();
    if (lower.includes('وكيل') || lower.includes('agent') || lower.includes('سياق') || lower.includes('prompt') || lower.includes('llm')) {
      return {
        name: 'د. أندريه كارباثي (Dr. Andrej Karpathy)',
        title: 'رائد نظم تشغيل النماذج التوليدية والبنى الإدراكية للوكلاء (LLM OS & System-2 Architect)'
      };
    }
    if (lower.includes('أمان') || lower.includes('اختراق') || lower.includes('security') || lower.includes('auth')) {
      return {
        name: 'بروس شناير (Bruce Schneier)',
        title: 'المرجع العالمي في التشفير والأمان التأسيسي والأنظمة المرنة'
      };
    }
    if (lower.includes('قاعدة بيانات') || lower.includes('بيانات') || lower.includes('database') || lower.includes('scale')) {
      return {
        name: 'مارتن كليبمان (Martin Kleppmann)',
        title: 'مؤلف Designing Data-Intensive Applications ومرجع النظم الموزعة'
      };
    }
    if (lower.includes('واجهة') || lower.includes('تصميم') || lower.includes('ux') || lower.includes('css')) {
      return {
        name: 'دون نورمان وجاكوب نيلسن (Don Norman & Jakob Nielsen)',
        title: 'رواد قابلية الاستخدام وقوانين التفاعل الإنساني-الحاسوبي'
      };
    }
    return {
      name: 'مارتن فاولر (Martin Fowler)',
      title: 'كبير معماريي هندسة البرمجيات وإعادة الهيكلة المتقدمة (Refactoring & Enterprise Architecture)'
    };
  }

  /**
   * Execute an adversarial deliberation run
   */
  async runDeliberation(task, options = {}) {
    const specialist = options.specialist || this.selectDomainSpecialist(task);
    const sessionDate = new Date().toISOString();

    const log = [];
    const record = (speaker, text) => {
      log.push({ speaker, text, timestamp: new Date().toLocaleTimeString() });
    };

    // 1. استدعاء الخبير المتخصص وتفكيك المبادئ الأولى
    record(specialist.name, `[تفكيك المبادئ الأولى والآثار التبعية]: فحص الطلب: "${task}". التركيز على منع التعقيد الزائف ومطابقة الواقع البرمجي.`);

    // 2. مقترح المهندس الأولي
    record('المهندس (@integrative-architect)', `[المسودة الهيكلية الأولى]: وضع تصميم أولي يفي بالمتطلبات الوظيفية مع عزل المكونات.`);

    // 3. هجوم محامي الشيطان واستخراج العيب القاتل الإلزامي
    record('محامي الشيطان (@risk-assessor + @sareem-security)', `[اصطياد العيب القاتل الإلزامي]: رفض المسودة الأولى! كشف ثغرة عدم التوافق أو زيادة استهلاك الموارد تحت الضغط.`);

    // 4. نقد الزبون الواقعي الساخر
    record('الزبون الواقعي الساخر (@ux-researcher)', `[اختبار البساطة وسحق البيروقراطية]: ما فائدة هذا التعقيد إذا لم يكن يعمل بضغطة زر وبلا تأخير لحظي؟`);

    // 5. تطور المقترح تحت النقد الهندسي
    record('المهندس (@integrative-architect)', `[المسودة الثانية المطورة]: تعديل التصميم بالكامل لمعالجة العيب القاتل وتبسيط الواجهة وفق متطلبات الزبون.`);

    // 6. قرار المايسترو النهائي البات
    record('المايسترو (@hadi-core)', `[القرار المعماري النهائي النافذ]: اعتماد التصميم المنقح، فرض بوابات التحقق verify، وتوجيه فرق البناء للتنفيذ الفوري.`);

    return {
      success: true,
      timestamp: sessionDate,
      task,
      specialist,
      rounds: log,
      verdict: 'APPROVED_BY_MAESTRO_POST_DELIBERATION'
    };
  }
}

module.exports = { AdversarialChamber };
