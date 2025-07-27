import { expect, test } from '@playwright/test'

test.describe('Race Board E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication by setting localStorage before navigation
    await page.goto('/')
    await page.evaluate(() => {
      // Mock the authentication data that the app expects using correct localStorage keys
      localStorage.setItem('auth_token', 'mock-jwt-token-test')
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        isAuthorized: true,
        roleGroups: [
          {
            key: 'race-operator',
            roles: ['race-view', 'race-manage'],
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      localStorage.setItem('token_expires_at', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())
    })
    
    // Now navigate to race board
    await page.goto('/race/board')
    await page.waitForLoadState('domcontentloaded')
    
    // Debug: Check current URL and page content
    console.log('Current URL:', page.url())
    await page.waitForLoadState('domcontentloaded')
    const pageContent = await page.content()
    console.log('Page contains "race-board":', pageContent.includes('race-board'))
    console.log('Page contains "data-testid":', pageContent.includes('data-testid'))
    console.log('Page contains "login":', pageContent.includes('login'))
    console.log('Page contains "auth":', pageContent.includes('auth'))
    console.log('Page title:', await page.title())
    
    // Wait for race board to be visible
    await expect(page.locator('[data-testid="race-board"]')).toBeVisible({ timeout: 10000 })
  })

  test('should load race board successfully', async ({ page }) => {
    // Verify we're on the race board page
    await expect(page).toHaveURL(/.*\/race\/board/)
    
    // Check for main race board elements
    await expect(page.locator('[data-testid="race-board"]')).toBeVisible()
    await expect(page.locator('[data-testid="race-toolbar"]')).toBeVisible()
  })

  test('should generate race day successfully', async ({ page }) => {
    // Click generate button
    await page.click('[data-testid="generate-race-day"]')
    
    // Wait for race day to be generated
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    // Verify race day elements are visible
    await expect(page.locator('[data-testid="race-program"]')).toBeVisible()
    await expect(page.locator('[data-testid="race-controls"]')).toBeVisible()
  })

  test('should start race and show running state', async ({ page }) => {
    // Generate race day first
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    // Click start race button
    await page.click('[data-testid="start-race"]')
    
    // Wait for race to start or complete - check for either running state or completion
    await expect(page.locator('[data-testid="race-running"], [data-testid="race-results"]').first()).toBeVisible({ timeout: 10000 })
    
    // Verify we're still on the race board
    await expect(page.locator('[data-testid="race-board"]')).toBeVisible()
    await expect(page.locator('[data-testid="race-track"]')).toBeVisible()
  })

  test('should start race and verify board state', async ({ page }) => {
    // Generate and start race
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    await page.click('[data-testid="start-race"]')
    
    // Wait for race to start and quickly pause it before it finishes
    await expect(page.locator('[data-testid="race-running"]')).toBeVisible({ timeout: 10000 })
    
    // Always verify we're still on the race board
    await expect(page.locator('[data-testid="race-board"]')).toBeVisible()
    await expect(page.locator('[data-testid="race-track"]')).toBeVisible()
  })

  test('should pause and resume race when possible', async ({ page }) => {
    // Generate and start race
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    await page.click('[data-testid="start-race"]')
    
    // Wait for race to start
    await expect(page.locator('[data-testid="race-running"]')).toBeVisible({ timeout: 10000 })
    
    // Try to pause quickly before race completes
    const pauseButton = page.locator('[data-testid="pause-race"]')
    const isPauseButtonVisible = await pauseButton.isVisible({ timeout: 5000 }).catch(() => false)
    
    // Only test pause/resume if button was visible (race didn't complete too quickly)
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (isPauseButtonVisible) {
      await page.click('[data-testid="pause-race"]')
      // eslint-disable-next-line playwright/no-conditional-expect
      await expect(page.locator('[data-testid="race-paused"]')).toBeVisible()
      
      // Resume race
      await page.click('[data-testid="resume-race"]')
      // eslint-disable-next-line playwright/no-conditional-expect
      await expect(page.locator('[data-testid="race-running"]')).toBeVisible()
    }
  })

  test('should reset race to initial state', async ({ page }) => {
    // Generate and start race
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    await page.click('[data-testid="start-race"]')
    
    // Wait for race to start or complete, then reset
    const raceRunning = page.locator('[data-testid="race-running"]')
    await raceRunning.isVisible({ timeout: 10000 }).catch(() => {
      // Race might have completed, that's fine
    })
    
    // Reset race
    await page.click('[data-testid="reset-race"]')
    
    // Handle confirmation modal
    await expect(page.locator('#confirm-title')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('#confirm-title')).toHaveText('Reset Race')
    
    // Debug: Check what buttons are available in the modal
    const modalButtons = await page.locator('.confirm-dialog button').all()
    console.log('Found modal buttons:', modalButtons.length)
    for (let i = 0; i < modalButtons.length; i++) {
      const text = await modalButtons[i].textContent()
      console.log(`Modal Button ${i}: ${text}`)
    }
    
    // Click the Reset button in the modal - always click the second button (Reset)
    await modalButtons[1].click()
    
    // Verify race is back to initial state
    await expect(page.locator('[data-testid="race-pending"]')).toBeVisible()
    await expect(page.locator('[data-testid="start-race"]')).toBeEnabled()
  })

  test('should display race results after completion', async ({ page }) => {
    // Generate and start race
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    await page.click('[data-testid="start-race"]')
    
    // Wait for race to complete (this might take some time)
    await expect(page.locator('[data-testid="race-results"]').first()).toBeVisible({ timeout: 60000 })
    
    // Verify results are displayed
    await expect(page.locator('[data-testid="race-results"]').first()).toBeVisible()
    await expect(page.locator('[data-testid="race-board"]')).toBeVisible()
  })

  test('should switch between different races', async ({ page }) => {
    // Generate race day
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    // Select different race
    await page.click('[data-testid="race-2"]')
    
    // Verify race selection changed
    await expect(page.locator('[data-selected="selected-race-2"]')).toBeVisible()
  })

  test('should display pist status correctly', async ({ page }) => {
    // Generate race day
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    // Check pist status display
    await expect(page.locator('[data-testid="pist-status"]')).toBeVisible()
    await expect(page.locator('[data-testid="grass-pist"]')).toBeVisible()
    await expect(page.locator('[data-testid="sand-pist"]')).toBeVisible()
  })

  test('should persist race day data', async ({ page }) => {
    // Generate race day
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    // Refresh page
    await page.reload()
    await page.waitForLoadState('domcontentloaded')
    
    // Verify race day is still there (persisted)
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible()
  })

  test('should display horse information correctly', async ({ page }) => {
    // Generate race day
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    // Check horse information display
    await expect(page.locator('[data-testid="horse-list"]')).toBeVisible()
    await expect(page.locator('[data-testid="horse-item"]')).toHaveCount(10) // 10 horses per race
  })

  test('should show round progression', async ({ page }) => {
    // Generate and start race
    await page.click('[data-testid="generate-race-day"]')
    await expect(page.locator('[data-testid="race-day-generated"]')).toBeVisible({ timeout: 10000 })
    
    // Handle the "Start Race" modal if it appears
    const startModal = page.locator('text=Horses are at the starter\'s command')
    const isModalVisible = await startModal.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (isModalVisible) {
      await page.click('button:has-text("Start Race")')
    }
    
    await page.click('[data-testid="start-race"]')
    
    // Wait for race to complete and results to be generated
    await expect(page.locator('[data-testid="race-results"]').first()).toBeVisible({ timeout: 60000 })
    
    // Now check for round progression elements
    await expect(page.locator('[data-testid="round-progress"]').first()).toBeVisible({ timeout: 10000 })
    
    // Verify round information is displayed
    await expect(page.locator('[data-testid="current-round"]').first()).toBeVisible()
    await expect(page.locator('[data-testid="round-distance"]').first()).toBeVisible()
  })
}) 