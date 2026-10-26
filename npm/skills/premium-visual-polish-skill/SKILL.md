---
name: premium-visual-polish-skill
description: Apply premium visual polish passes: spacing rhythm, shadows, gradients, micro-interactions, magazine-grade typography.
version: 1.1.0
category: creative
owner: cinematic-director
tags: [visual, production, anti-slop]
lang: [en, ar]
---

# مهارة اللمسات البصرية الفاخرة (Premium Visual Polish Skill)

مهارة متقدمة لتحويل المواقع العادية إلى واجهات "بريميوم" أصيلة باستخدام تقنيات التصميم الحديثة مع نبذ الكليشيهات الرخيصة.

---

## 🎨 التقنيات المعتمدة:
*   **Magazine-Grade Typography:** الاعتماد على العناوين الصريحة النقية ذات التسلسل الواضح دون تشويش.
*   **Depth & Layering:** إنشاء عمق بصري من خلال الظلال الناعمة متعددة الطبقات (Multi-layered Soft Shadows).
*   **Subtle Lighting & Glass:** لمسات زجاجية خفيفة متناسقة تخدم بنية المحتوى وليست ديكوراً مصطنعاً.
*   **Micro-interactions:** حركات خفيفة سلسة عند التحويم (Hover) تزيد من تفاعل المستخدم دون بطء.

## 🚫 محظورات الجودة (Anti-AI Slop Rules):
1.  **حظر كبسولات الـ Hero (Hero Pill Badges):** يُمنع وضع كبسولات بيضاوية `rounded-full` ذات خلفية صفراء أو برتقالية أو نيون ونقاط نابضة فوق العناوين.
2.  **منع التظليل التحذيري الأصفر:** تجنب حشو العبارات الترويجية داخل صناديق صفراء تشبه أخطاء أو تنبيهات التحذير.
3.  **البديل الاحترافي:** استخدام الأشرطة العلوية المستقيمة أعلى الصفحة (Top Announcement Bar) أو أختام الجودة الرسمية داخل قسم المنتج.

## 💻 كود التنسيق الأساسي:
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.editorial-eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 0.75rem;
}
```

## 📈 معايير الجودة:
1.  **الاتساق اللوني الأصيل:** استخدام لوحة ألوان مستوحاة من مجال وهوية البراند الحقيقي.
2.  **التسلسل الهرمي النظيف:** جعل العنوان الرئيسي H1 هو النجم البصري للصفحة بلا أي شارات مشتتة تعلوه.
