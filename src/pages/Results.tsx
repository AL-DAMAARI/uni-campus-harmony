import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, TrendingUp, Download, FileText, Calendar, Award, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for student results
const mockSemesterResults = [
  {
    id: '1',
    semester: 'Fall 2024',
    year: '2024',
    status: 'completed',
    gpa: 3.75,
    cgpa: 3.68,
    totalCredits: 18,
    earnedCredits: 18,
    courses: [
      { code: 'CS101', name: 'Introduction to Computer Science', credits: 3, grade: 'A-', gpa: 3.7, marks: 85, totalMarks: 100 },
      { code: 'MATH201', name: 'Calculus II', credits: 4, grade: 'B+', gpa: 3.3, marks: 78, totalMarks: 100 },
      { code: 'PHYS101', name: 'Physics I', credits: 3, grade: 'A', gpa: 4.0, marks: 92, totalMarks: 100 },
      { code: 'ENG102', name: 'English Composition', credits: 3, grade: 'A-', gpa: 3.7, marks: 88, totalMarks: 100 },
      { code: 'HIST201', name: 'World History', credits: 3, grade: 'B+', gpa: 3.3, marks: 82, totalMarks: 100 },
      { code: 'LAB101', name: 'Computer Lab', credits: 2, grade: 'A', gpa: 4.0, marks: 95, totalMarks: 100 }
    ]
  },
  {
    id: '2',
    semester: 'Spring 2024',
    year: '2024',
    status: 'completed',
    gpa: 3.62,
    cgpa: 3.65,
    totalCredits: 16,
    earnedCredits: 16,
    courses: [
      { code: 'CS102', name: 'Data Structures', credits: 3, grade: 'B+', gpa: 3.3, marks: 81, totalMarks: 100 },
      { code: 'MATH202', name: 'Linear Algebra', credits: 3, grade: 'A-', gpa: 3.7, marks: 87, totalMarks: 100 },
      { code: 'PHYS102', name: 'Physics II', credits: 3, grade: 'A', gpa: 4.0, marks: 91, totalMarks: 100 },
      { code: 'CHEM101', name: 'General Chemistry', credits: 4, grade: 'B', gpa: 3.0, marks: 75, totalMarks: 100 },
      { code: 'PE101', name: 'Physical Education', credits: 1, grade: 'A', gpa: 4.0, marks: 98, totalMarks: 100 },
      { code: 'LAB102', name: 'Physics Lab', credits: 2, grade: 'A-', gpa: 3.7, marks: 89, totalMarks: 100 }
    ]
  },
  {
    id: '3',
    semester: 'Fall 2023',
    year: '2023',
    status: 'completed',
    gpa: 3.58,
    cgpa: 3.62,
    totalCredits: 15,
    earnedCredits: 15,
    courses: [
      { code: 'CS100', name: 'Programming Fundamentals', credits: 3, grade: 'A-', gpa: 3.7, marks: 86, totalMarks: 100 },
      { code: 'MATH101', name: 'Calculus I', credits: 4, grade: 'B+', gpa: 3.3, marks: 79, totalMarks: 100 },
      { code: 'ENG101', name: 'English Literature', credits: 3, grade: 'A', gpa: 4.0, marks: 93, totalMarks: 100 },
      { code: 'BIO101', name: 'General Biology', credits: 3, grade: 'B', gpa: 3.0, marks: 76, totalMarks: 100 },
      { code: 'SOC101', name: 'Introduction to Sociology', credits: 2, grade: 'A-', gpa: 3.7, marks: 88, totalMarks: 100 }
    ]
  }
];

// Mock data for all students (for admin/faculty view)
const mockAllStudents = [
  {
    id: 'STU2024001',
    name: 'John Doe',
    program: 'Computer Science',
    currentSemester: 'Fall 2024',
    cgpa: 3.68,
    totalCredits: 49,
    status: 'active'
  },
  {
    id: 'STU2024002',
    name: 'Jane Smith',
    program: 'Mathematics',
    currentSemester: 'Fall 2024',
    cgpa: 3.85,
    totalCredits: 52,
    status: 'active'
  },
  {
    id: 'STU2024003',
    name: 'Mike Johnson',
    program: 'Physics',
    currentSemester: 'Fall 2024',
    cgpa: 3.42,
    totalCredits: 46,
    status: 'active'
  }
];

export default function Results() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('');

  const isStudent = user?.role === 'student';
  const currentUserResults = isStudent ? mockSemesterResults : [];

  const getGradeBadge = (grade: string) => {
    const gradeColors = {
      'A+': 'bg-university-green text-white',
      'A': 'bg-university-green text-white',
      'A-': 'bg-university-blue text-white',
      'B+': 'bg-university-gold text-white',
      'B': 'bg-yellow-500 text-white',
      'B-': 'bg-orange-500 text-white',
      'C+': 'bg-orange-600 text-white',
      'C': 'bg-red-500 text-white',
      'C-': 'bg-red-600 text-white',
      'D': 'bg-red-700 text-white',
      'F': 'bg-red-800 text-white'
    };
    
    return (
      <Badge className={gradeColors[grade as keyof typeof gradeColors] || 'bg-gray-500 text-white'}>
        {grade}
      </Badge>
    );
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-university-green';
    if (gpa >= 3.3) return 'text-university-blue';
    if (gpa >= 3.0) return 'text-university-gold';
    return 'text-red-500';
  };

  const downloadTranscript = (semesterId?: string) => {
    toast({
      title: "Download Started",
      description: semesterId ? "Semester transcript is being prepared." : "Complete transcript is being prepared.",
    });
  };

  const calculateAverageGPA = () => {
    if (currentUserResults.length === 0) return 0;
    return currentUserResults.reduce((sum, sem) => sum + sem.gpa, 0) / currentUserResults.length;
  };

  const getTotalCredits = () => {
    return currentUserResults.reduce((sum, sem) => sum + sem.earnedCredits, 0);
  };

  const getHighestGPA = () => {
    if (currentUserResults.length === 0) return 0;
    return Math.max(...currentUserResults.map(sem => sem.gpa));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-university-navy">
            {isStudent ? 'My Results' : 'Student Results'}
          </h1>
          <p className="text-muted-foreground">
            {isStudent 
              ? 'View your academic performance and semester results'
              : 'View and manage student academic results'
            }
          </p>
        </div>
        {isStudent && (
          <Button onClick={() => downloadTranscript()} className="bg-university-blue hover:bg-university-blue/90">
            <Download className="h-4 w-4 mr-2" />
            Download Complete Transcript
          </Button>
        )}
      </div>

      {isStudent ? (
        <>
          {/* Student Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="gradient-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-8 w-8 text-university-gold" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current CGPA</p>
                    <p className={`text-2xl font-bold ${getGPAColor(currentUserResults[0]?.cgpa || 0)}`}>
                      {currentUserResults[0]?.cgpa || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-university-green" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Highest GPA</p>
                    <p className={`text-2xl font-bold ${getGPAColor(getHighestGPA())}`}>
                      {getHighestGPA().toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-8 w-8 text-university-purple" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                    <p className="text-2xl font-bold text-university-navy">{getTotalCredits()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-8 w-8 text-university-blue" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Semesters</p>
                    <p className="text-2xl font-bold text-university-navy">{currentUserResults.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Semester Results */}
          <div className="space-y-6">
            {currentUserResults.map((semester) => (
              <Card key={semester.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-university-blue/10 to-university-purple/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {semester.semester} {semester.year}
                      </CardTitle>
                      <CardDescription>
                        {semester.earnedCredits} Credits • GPA: {semester.gpa} • CGPA: {semester.cgpa}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={semester.status === 'completed' ? 'default' : 'secondary'}>
                        {semester.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => downloadTranscript(semester.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>GPA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.courses.map((course, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>{course.marks}/{course.totalMarks}</TableCell>
                          <TableCell>{getGradeBadge(course.grade)}</TableCell>
                          <TableCell className={getGPAColor(course.gpa)}>{course.gpa}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Semester GPA</p>
                        <p className={`text-lg font-bold ${getGPAColor(semester.gpa)}`}>{semester.gpa}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                        <p className={`text-lg font-bold ${getGPAColor(semester.cgpa)}`}>{semester.cgpa}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Credits Earned</p>
                        <p className="text-lg font-bold text-university-navy">{semester.earnedCredits}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Credits</p>
                        <p className="text-lg font-bold text-university-navy">{semester.totalCredits}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        // Admin/Faculty view
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="individual">Individual Results</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Overview</CardTitle>
                <CardDescription>Summary of all student academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Current Semester</TableHead>
                      <TableHead>CGPA</TableHead>
                      <TableHead>Total Credits</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAllStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.program}</TableCell>
                        <TableCell>{student.currentSemester}</TableCell>
                        <TableCell className={getGPAColor(student.cgpa)}>{student.cgpa}</TableCell>
                        <TableCell>{student.totalCredits}</TableCell>
                        <TableCell>
                          <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Individual Student Results</CardTitle>
                <CardDescription>View detailed results for specific students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAllStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button disabled={!selectedStudent}>
                    View Results
                  </Button>
                </div>
                {selectedStudent && (
                  <div className="text-center text-muted-foreground py-8">
                    Select a student and click "View Results" to see their detailed academic record.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}