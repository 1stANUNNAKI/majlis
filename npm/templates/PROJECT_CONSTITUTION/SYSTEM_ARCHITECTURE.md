# 🏛️ المعمارية العامة للنظام وتكامل الطبقات (System Architecture)
- **النمط المعماري:** Modular Clean Architecture (مستقل عن أطر العمل الخارجية).
- **الطبقات:**
  - Client Presentation Layer (Web / Mobile / CLI)
  - API Gateway & Shield (Validation, Rate Limiting, Auth)
  - Application Service Layer (Pure Business Logic)
  - Data Access & Persistence Layer (Repository Pattern)
- **التواصل:** استدعاءات مهيكلة تعتمد على عقود صارمة (TypeScript / JSON Schemas).