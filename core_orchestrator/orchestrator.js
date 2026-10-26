/**
 * 🎼 الأوركستريتر الأعلى ومجلس قادة الفرق — الإصدار الحركي المتقدم v12.0
 * متصل بخزينة التصاميم العالمية (DESIGN_VAULT) ومحرك المداولة المعاكسة (Adversarial Chamber).
 */
const fs = require('fs');
const path = require('path');
const { HumanQAEvaluationLoop } = require('../divisions/07_human_qa_learning/human_qa_engine');
const { AgentHistoricalMemory } = require('../memory/agent_memory_engine');
const { AdversarialChamber } = require('./adversarial_chamber');

class SupremeOrchestrator {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.memory = new AgentHistoricalMemory(projectRoot);
    this.humanQA = new HumanQAEvaluationLoop({ projectRoot });
    this.chamber = new AdversarialChamber(this, projectRoot);
    this.vaultPath = path.join(__dirname, '..', 'templates', 'PROJECT_CONSTITUTION', 'DESIGN_VAULT');

    this.divisions = {
      'web_cloud': { name: 'فرقة الويب والأنظمة السحابية', chief: '@web-marshal' },
      'mobile_apps': { name: 'فرقة تطبيقات الهاتف المحمول', chief: '@mobile-commander' },
      'design_system': { name: 'فرقة أنظمة التصميم ودستور المشروع', chief: '@constitution-guardian' },
      'marketing': { name: 'فرقة التسويق وعروض القوة', chief: '@marketing-strategist' },
      'creative_media': { name: 'فرقة القصص والميديا والصوت', chief: '@media-director' },
      'vector_print': { name: 'فرقة المطبوعات والأعمال المكتبية', chief: '@print-chancellor' },
      'human_qa': { name: 'فرقة الفحص البشري والتعلم الذاتي', chief: '@human-qa-lead' }
    };
  }

  /**
   * اختيار تلقائي لأفضل الأنماط الحركية من الخزينة وفق طلب العميل
   */
  selectDesignArchetypes(userRequest) {
    const selected = [];
    const lower = userRequest.toLowerCase();

    if (lower.includes('منتج') || lower.includes('معمارية') || lower.includes('تقنية') || lower.includes('هندسة')) {
      selected.push({
        category: '3D Explode & Disassembly',
        archetype: 'Apple iPhone / Cloud Server Disassembly View',
        refFile: '02_explode_disassembly/EXPLODE_DISASSEMBLY_30.md'
      });
    }
    if (lower.includes('ميزات') || lower.includes('لوحة') || lower.includes('داشبورد') || lower.includes('bento')) {
      selected.push({
        category: 'Bento Grid Architecture',
        archetype: 'Linear Task Intelligence Grid مع Radial Spotlight',
        refFile: '03_bento_grids_spotlight/BENTO_GRIDS_SPOTLIGHT_30.md'
      });
    }
    if (lower.includes('تسويق') || lower.includes('أرباح') || lower.includes('حاسبة') || lower.includes('roi')) {
      selected.push({
        category: 'Interactive Performance Calculators',
        archetype: 'Ad Spend Waste & Recovery Interactive Slider',
        refFile: '05_interactive_calculators/INTERACTIVE_CALCULATORS_30.md'
      });
    }
    if (lower.includes('فخم') || lower.includes('بطاقات') || lower.includes('اشتراك') || lower.includes('card')) {
      selected.push({
        category: '3D Tilt & Glassmorphism',
        archetype: 'Frosted Crystal SaaS Tier Card مع انعكاسات ضوئية',
        refFile: '04_3d_tilt_glassmorphism/TILT_GLASS_CARDS_30.md'
      });
    }

    // افتراضي نخبوي في حال كان الطلب عاماً
    if (selected.length === 0) {
      selected.push(
        { category: 'Bento Grid Architecture', archetype: 'Raycast Command Extensions Bento', refFile: '03_bento_grids_spotlight/BENTO_GRIDS_SPOTLIGHT_30.md' },
        { category: 'Scroll Narrative', archetype: 'Linear Issue Flow Journey', refFile: '01_scroll_narratives/SCROLL_NARRATIVES_30.md' }
      );
    }

    return selected;
  }

  async processUserDirective(userRequest) {
    console.log('[الأوركستريتر الأعلى] استلام الطلب: ' + userRequest);

    // فحص تشغيل غرفة العمليات المعاكسة للمهام الحساسة
    let chamberResult = null;
    if (this.chamber.isHighStakes(userRequest)) {
      console.log('⚡ [تحذير معماري]: تم تصنيف الطلب كعالي الخطورة الحوكمية (High-Stakes) — استدعاء غرفة العمليات المغلقة (MARP)...');
      chamberResult = await this.chamber.runDeliberation(userRequest);
      console.log(`   🏛️ الخبير المستدعى: ${chamberResult.specialist.name}`);
      console.log(`   ⚖️ حكم المايسترو: ${chamberResult.verdict}`);
    }

    console.log('[مجلس القادة] استدعاء خزينة التصاميم واختيار الأنماط القياسية الملائمة...');
    const chosenArchetypes = this.selectDesignArchetypes(userRequest);

    const plan = {
      timestamp: new Date().toISOString(),
      request: userRequest,
      chamberDeliberation: chamberResult,
      assignedDivisions: [],
      selectedArchetypes: chosenArchetypes
    };

    const lower = userRequest.toLowerCase();
    if (lower.includes('ويب') || lower.includes('موقع') || lower.includes('web') || lower.includes('api')) {
      plan.assignedDivisions.push('web_cloud');
    }
    if (lower.includes('هاتف') || lower.includes('موبايل') || lower.includes('تطبيق') || lower.includes('mobile')) {
      plan.assignedDivisions.push('mobile_apps');
    }
    if (lower.includes('تصميم') || lower.includes('دستور') || lower.includes('قواعد بيانات') || lower.includes('design') || lower.includes('موشن')) {
      plan.assignedDivisions.push('design_system');
    }
    if (lower.includes('تسويق') || lower.includes('مبيعات') || lower.includes('marketing') || lower.includes('funnel')) {
      plan.assignedDivisions.push('marketing');
    }
    if (lower.includes('فيديو') || lower.includes('موشن') || lower.includes('صوت') || lower.includes('media')) {
      plan.assignedDivisions.push('creative_media');
    }
    if (lower.includes('طباعة') || lower.includes('مستند') || lower.includes('pdf')) {
      plan.assignedDivisions.push('vector_print');
    }

    if (plan.assignedDivisions.length === 0) {
      plan.assignedDivisions.push('web_cloud', 'design_system');
    }
    plan.assignedDivisions.push('human_qa');

    console.log('الفرق المشاركة المعتمدة: ' + plan.assignedDivisions.map(d => this.divisions[d].name).join(' | '));
    console.log('الأنماط الحركية المختارة تلقائياً من الخزينة:');
    chosenArchetypes.forEach(a => console.log(`   💎 [${a.category}]: ${a.archetype}`));

    return plan;
  }
}

module.exports = { SupremeOrchestrator };
