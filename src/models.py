from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Table, Enum
from sqlalchemy.orm import relationship

from database import Base


ProjectMaintainer = Table('ProjectMaintainer',
    Column('id', Integer, primary_key=True),
    Column('project_Id', Integer, ForeignKey('Project.id')),
    Column('maintainer_id', Integer, ForeignKey('Maintainer.id')))


ProjectCategory = Table('ProjectCategory',
    Column('id', Integer, primary_key=True),
    Column('project_Id', Integer, ForeignKey('Project.id')),
    Column('category_id', Integer, ForeignKey('Category.id')))


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class ProjectType(Base):
    __tablename__ = "project_types"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(length=250))
    description = Column(Text)
    github_url = Column(Text)
    documentation_url = Column(Text)
    programming_language = Column(Enum("Python", "R", "Julia"))
    experience_level = Column(Enum("Beginner", "Intermediate", "Expert"))

    project_type_id = Column(Integer, ForeignKey("project_types.id"))
    project_type = relationship("ProjectType", back_populates="projects")

    categories = relationship("Category", secondary=ProjectCategory, backref="Category")

    license = Column(String(length=250))

    maintainers = relationship("Maintainer", secondary=ProjectMaintainer, backref="Maintainer")


class Maintainer(Base):
    __tablename__ = "maintainers"

    name = Column(String(length=250))

    github_url = Column(Text)
    twitter_url = Column(Text)

    projects = relationship("User", back_populates="items")