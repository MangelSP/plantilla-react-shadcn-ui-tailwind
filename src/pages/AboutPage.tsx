import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">About Us</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Learn about what drives us</CardDescription>
        </CardHeader>
        <CardContent>
          <p>We are dedicated to creating amazing web experiences using the latest technologies and best practices.</p>
        </CardContent>
      </Card>
    </div>
  );
}