import { Header } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import clsx from 'clsx';

type ThemeOption = 'light' | 'dark' | 'system';

export function Settings() {
  const { setTheme } = useTheme();

  const themeOptions: { value: ThemeOption; label: string; icon: typeof Sun; description: string }[] = [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Clean and bright interface',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes in low light',
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Follows your device settings',
    },
  ];

  const handleThemeChange = (newTheme: ThemeOption) => {
    if (newTheme === 'system') {
      // Clear localStorage and use system preference
      localStorage.removeItem('theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      // Force reload to apply system theme
      window.location.reload();
    } else {
      setTheme(newTheme);
    }
  };

  // Determine current selection (check if using system preference)
  const storedTheme = localStorage.getItem('theme');
  const currentSelection: ThemeOption = storedTheme ? (storedTheme as ThemeOption) : 'system';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative transition-colors duration-300">
      <Header title="Settings" subtitle="Customize your experience" />

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        {/* Theme Settings Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>

          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appearance</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customize how Xchange looks on your device</p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Theme
              </label>

              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = currentSelection === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={clsx(
                      'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200',
                      isSelected
                        ? 'border-blue-500 dark:border-cyan-400 bg-blue-50/50 dark:bg-cyan-400/10'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 bg-white/40 dark:bg-slate-800/40'
                    )}
                  >
                    <div className={clsx(
                      'p-3 rounded-xl',
                      isSelected
                        ? 'bg-blue-100 dark:bg-cyan-400/20'
                        : 'bg-gray-100 dark:bg-slate-700'
                    )}>
                      <Icon className={clsx(
                        'w-5 h-5',
                        isSelected
                          ? 'text-blue-600 dark:text-cyan-400'
                          : 'text-gray-600 dark:text-gray-400'
                      )} />
                    </div>

                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="p-1 rounded-full bg-blue-500 dark:bg-cyan-400">
                        <Check className="w-4 h-4 text-white dark:text-slate-900" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Preview Section */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Preview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-lg">
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
                  <div className="relative text-white">
                    <div className="text-xs font-semibold mb-2 opacity-90">SAMPLE CARD</div>
                    <div className="text-2xl font-bold mb-1">6.7M</div>
                    <div className="text-xs opacity-80">Monthly Reach</div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-6 shadow-lg">
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
                  <div className="relative">
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">SAMPLE CARD</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">134</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">LED Inventories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Settings Sections (Placeholder) */}
        <div className="mt-6 relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-8 shadow-xl">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">About</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Xchange Digital Inventories Platform
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Version</span>
                <span className="font-semibold text-gray-900 dark:text-white">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Platform</span>
                <span className="font-semibold text-gray-900 dark:text-white">Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
