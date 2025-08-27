import { NextResponse } from 'next/server'
import { blogService } from '@/services/blogService'

export async function GET() {
  try {
    const result = await blogService.getCategories()
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
