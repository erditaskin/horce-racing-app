import type { AppModule } from '@/lib/types/module';
import { transformModules } from '@/lib/utils/module';

const modulesGlob = import.meta.glob('./*/index.ts', { eager: true }) as Record<string, { default: AppModule }>

const modules = transformModules<AppModule>(modulesGlob)

export default modules