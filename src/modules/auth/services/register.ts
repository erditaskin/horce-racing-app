export class RegisterService {
  static async register(data: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }): Promise<{
    success: boolean
    message: string
    user?: { id: string; email: string; name: string; createdAt: string }
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (data.email === 'existing@example.com') {
      throw new Error('Email already exists')
    }

    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Mock successful registration
    return {
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      user: {
        id: 'user_' + Date.now(),
        email: data.email,
        name: data.name,
        createdAt: new Date().toISOString(),
      },
    }
  }
}
