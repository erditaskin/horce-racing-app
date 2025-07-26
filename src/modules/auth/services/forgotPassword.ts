export class ForgotPasswordService {
  static async requestReset(data: {
    email: string
  }): Promise<{ success: boolean; message: string; resetToken?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (data.email === 'nonexistent@example.com') {
      throw new Error('Email not found in our system')
    }

    // Mock successful password reset request
    return {
      success: true,
      message: 'Password reset instructions have been sent to your email address.',
      resetToken: 'reset_token_' + Date.now(),
    }
  }
}
