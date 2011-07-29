import MySQLdb
import hashlib


conn = MySQLdb.connect(host = "127.0.0.1",port=3307,db = "assessmentsystemdb", user = 'root', passwd = '111')
curs = conn.cursor()
class Dao:
    def login(self,username,passwd):
        hash=hashlib.md5()
        hash.update(passwd)
        password=hash.digest()
        sql="select usertype from Account where username=%s and password=%s"
        curs.execute(sql,(username,password))
        result=curs.fetchall()
        if result:
            return result[0]
        else: 
            return "failed" 
        
    def openAccount(self,username,passwd,usertype):
        hash=hashlib.md5()
        hash.update(passwd)
        password=hash.digest()
        sqlquery="select * from Account where username=%s"
        curs.execute(sqlquery,(username,))
        if curs.fetchall():return "exist"
        else:
            try:
                sql="insert into Account(username,password,usertype) values(%s,%s,%s)"
                curs.execute(sql,(username,password,usertype))
                conn.commit()
                return "added"
            except:
                return "failed"
            else:
                return "failed"  
    
    def getProgramNames(self):
        sql="select name from programs "
        curs.execute(sql)
        result=curs.fetchall()
        return result
            
    def addProgramName(self,programName,programDes):
        sqlquery="select * from programs where name=%s"
        curs.execute(sqlquery,(programName,))
        if curs.fetchall():return "exist"
        else:
            try:
                sql="insert into programs(name,Description) values(%s,%s)"      
                curs.execute(sql,(programName,programDes))
                conn.commit()
                return True
            except:return False
            else:return False
            
    def addCourseName(self,courseName,courseDes):
        sqlquery="select * from courses where name=%s"
        curs.execute(sqlquery,(courseName,))
        if curs.fetchall():return "exist"
        else:
            try:
                sql="insert into courses(name,Description) values(%s,%s)"      
                curs.execute(sql,(courseName,courseDes))
                conn.commit()
                return True
            except:return False
            else:return False
            
    def selectProgram(self,programName):
        sql="select idPrograms from programs where name=%s"
        curs.execute(sql,(programName,))
        return curs.fetchone()[0]
    
    def selectCourse(self,courseName):
        sql="select idcourses from courses where name=%s"
        curs.execute(sql,(courseName,))
        return curs.fetchone()[0]
    
    def selectProgramDes(self,programName):
        id=self.selectProgram(programName)
        sql="select Description from programs where idprograms=%s"
        curs.execute(sql,(id,))
        return curs.fetchone();
    
    def selectProgramOutcome(self,programName):
        id=self.selectProgram(programName)
        sql="select name from outcomes where programid=%s&&currentlyActived='Active'"
        curs.execute(sql,(id,))
        return curs.fetchall()
    
    def selectOutcomeId(self,programName):
        id=self.selectProgram(programName)
        sql="select idoutcomes from outcomes where programid=%s&&currentlyActived='Active'"
        curs.execute(sql,(id,))
        return curs.fetchall()
    
    def selectEduObjId(self,programName):
        id=self.selectProgram(programName)
        sql="select ideduObjs from eduobjs where programid=%s&&currentlyActived='Active'"
        curs.execute(sql,(id,))
        return curs.fetchall()
    
    def selectProgramEduObj(self,programName):
        id=self.selectProgram(programName)
        sql="select name from eduobjs where programid=%s&&currentlyActived='Active'"
        curs.execute(sql,(id,))
        return curs.fetchall()
    
    def addProgramEduObj(self,programEduObj,name,programName):
        try:
            id=self.selectProgram(programName)
            sqlEduObjInsertion="insert into eduobjs(name,content,programid) values(%s,%s,%s)"
            curs.execute(sqlEduObjInsertion,(name,programEduObj,id))
            conn.commit()
            return True
        except:return False
        else:return False
        
    def addProgramOutcome(self,programOutcome,name,programName):
        try:
            id=self.selectProgram(programName)
            sqlOutcomeInsertion="insert into outcomes(name,content,programid) values(%s,%s,%s)"
            curs.execute(sqlOutcomeInsertion,(name,programOutcome,id))
            conn.commit()
            return True
        except:return False
        else:return False
        
    def addProgram(self,programName,programDes):
        if self.addProgramName(programName,programDes):
            return "added"
        else: return "failed"
        
    def addCourseToProgram(self,courseName,programName):
        id=self.selectProgram(programName)
        courseid=self.selectCourse(courseName)
        sql="update courses set programid=%s where idcourses=%s"
        try:
            curs.execute(sql,(id,courseid))
            conn.commit()
            return True
        except:return False
        else:return False
        
    def addCourseToProgramOutcome(self,outcomeId,courseId):
        sql="insert into outcomes_courses(outcomeid,courseid) values(%s,%s)"
        try:
            curs.execute(sql,(outcomeId,courseId))
            conn.commit()
            return True
        except:return False
        else:return False
        
    def getCourseList(self,programName):
        programId=self.selectProgram(programName)
        sql="select idcourses,name from courses where programid=%s&&currentlyActived='Active'"
        curs.execute(sql,(programId))
        return curs.fetchall()    
        
    def getFullCourseList(self):
        sql="select idcourses,name from courses where currentlyActived='Active'"
        curs.execute(sql,())
        return curs.fetchall()
            
    def getProgramDetails(self,programName):
        outcomeid=self.selectOutcomeId(programName)
        eduobjid=self.selectEduObjId(programName)
        programoutcome=self.selectProgramOutcome(programName)
        programeduobj=self.selectProgramEduObj(programName)
        programDes=self.selectProgramDes(programName)
        dic={'programname':programName,'programdes':programDes,'outcomeid':outcomeid,'eduobjid':eduobjid,'programoutcome':programoutcome,"programeduobj":programeduobj}
        return dic
    
    def addCourseToOutcome(self,courseid,outcomeid):
        sql="insert into outcomes_courses(outcomeid,courseid) values(%s,%s)"
        try:
            curs.execute(sql,(outcomeid,courseid))
            conn.commit()
            return True
        except: return False
        else:return False
        
    def getCourseWithOutcome(self,outcomeid): 
        sql="select courseid from outcomes_courses where outcomeid=%s"
        curs.execute(sql,(outcomeid))
        courseids=curs.fetchall()
        list=[]
        for cId in courseids:
            courseQuery="select name from courses where idcourses=%s&&currentlyActived='Active'"
            curs.execute(courseQuery,(cId))
            coursename=curs.fetchall()
            list.append(coursename)
        return list
    
    def deleteOutcome(self,outcomeid):
        sql="update outcomes set currentlyActived='Inactive' where idoutcomes=%s"
        try:
            curs.execute(sql,(outcomeid))
            conn.commit()
            return True
        except:return False   
        else:return False 
        
    def deleteCourse(self,courseid):
        sql="update courses set currentlyActived='Inactive' where idcourses=%s"
        try:
            curs.execute(sql,(courseid))
            conn.commit()
            return True
        except:return False   
        else:return False 
        
    def deleteEduobj(self,eduobjid):
        sql="update eduobjs set currentlyActived='Inactive' where ideduObjs=%s"
        try:
            curs.execute(sql,(eduobjid))
            conn.commit()
            return True
        except:return False   
        else:return False 
        
    def getOutcome(self,outcomeid):
        sql="select content from outcomes where idoutcomes=%s&&currentlyActived='Active'"
        curs.execute(sql,(outcomeid))
        return curs.fetchone()
    
    def getEduobj(self,eduobjid):
        sql="select content from eduobjs where ideduObjs=%s&&currentlyActived='Active'"
        curs.execute(sql,(eduobjid))
        return curs.fetchone()
        
            